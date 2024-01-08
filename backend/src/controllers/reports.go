package controllers

import (
	"clockmate/backend/models"
	"math"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type SummaryValue struct {
	Hours   uint `json:"hours"`
	Minutes uint `json:"minutes"`
}

func FetchSummary(c *gin.Context) {
	userID, err := ExtractTokenUserID(c)
	if err != nil {
		return
	}

	var activities []models.Activity

	today := time.Now()

	firstDayOfMonth := time.Date(today.Year(), today.Month(), 1, 0, 0, 0, 0, today.Location())
	lastDayOfMonth := firstDayOfMonth.AddDate(0, 1, -1)

	layout := "2006-01-02"
	firstDayStr := firstDayOfMonth.Format(layout)
	lastDayStr := lastDayOfMonth.Format(layout)

	dbQuery := models.DB.Where(models.Activity{UserID: userID})
	dbQuery = dbQuery.Where("started_at BETWEEN ? AND ?", firstDayStr, lastDayStr)
	dbQuery = dbQuery.Order("started_at ASC")
	dbQuery.Find(&activities)

	monthMinutes := uint(0)
	weekMinutes := uint(0)
	todayMinutes := uint(0)

	for i := 0; i < len(activities); i++ {
		curr := activities[i]

		if curr.FinishedAt != nil {
			truncatedDate := curr.StartedAt.Truncate(24 * time.Hour)

			// add everything to month
			diff := curr.FinishedAt.Sub(curr.StartedAt)
			diffMinutes := uint(math.Floor(diff.Minutes()))
			monthMinutes += diffMinutes

			// check if started_at in current week
			weekStart := time.Now().AddDate(0, 0, -int(time.Now().Weekday())+1).Truncate(24 * time.Hour)
			weekEnd := weekStart.AddDate(0, 0, 6).Truncate(24 * time.Hour)

			if (truncatedDate.After(weekStart) && truncatedDate.Before(weekEnd)) || truncatedDate.Equal(weekEnd) || truncatedDate.Equal(weekStart) {
				weekMinutes += diffMinutes
			}

			// check if started_at date equals today. Truncate cuts of the time component and set to midnight
			if truncatedDate.Equal(time.Now().Truncate(24 * time.Hour)) {
				todayMinutes += diffMinutes
			}
		}
	}

	sumMonth := SummaryValue{Hours: uint(float64(monthMinutes / 60)), Minutes: monthMinutes % 60}
	sumWeek := SummaryValue{Hours: uint(float64(weekMinutes / 60)), Minutes: weekMinutes % 60}
	sumToday := SummaryValue{Hours: uint(float64(todayMinutes / 60)), Minutes: todayMinutes % 60}

	c.JSON(http.StatusOK, gin.H{
		"today": sumToday,
		"week":  sumWeek,
		"month": sumMonth,
	})
}
