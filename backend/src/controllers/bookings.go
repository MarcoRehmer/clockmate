package controllers

import (
	"clockmate/backend/models"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
	"time"
)

func parseDateParam(c *gin.Context, queryKey string, defaultDate time.Time) (string, bool) {
	param, ok := c.GetQuery(queryKey)
	if !ok {
		return defaultDate.Format(time.RFC3339), false
	}

	parsed, err := time.Parse("2006-01-02", param)
	if err != nil {
		fmt.Println(err)
		return "", false
	}

	return parsed.Format(time.RFC3339), true
}

// FindBookings GET /bookings
func FindBookings(c *gin.Context) {
	var bookings []models.Booking
	dbQuery := models.DB

	fromVal, fromOk := parseDateParam(c, "rangeFrom", time.Time{})
	if !fromOk {
		fromVal = time.Time{}.Format(time.RFC3339) // assign default value
	}

	toVal, toOk := parseDateParam(c, "rangeTo", time.Now())
	if !toOk {
		toVal = time.Now().Format(time.RFC3339) // assign default value
	}

	if fromOk || toOk {
		dbQuery = dbQuery.Where("started_at BETWEEN ? AND ?", fromVal, toVal)
	}

	//visibleValuesParam, _ := c.GetQueryArray("visibleValues")
	//if ok {
	//	queryArgs = append(queryArgs, "clientId = ?")
	//}

	if orderByParam, orderOk := c.GetQueryMap("orderBy"); orderOk {
		dbQuery = dbQuery.Order(orderByParam["prop"] + " " + strings.ToUpper(orderByParam["direction"]))
	} else {
		dbQuery = dbQuery.Order("id DESC")
	}

	dbQuery.Find(&bookings)

	c.JSON(http.StatusOK, bookings)
}

// CreateBooking POST /bookings
func CreateBooking(c *gin.Context) {
	// validate input
	var input models.CreateBookingInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// create booking
	booking := models.Booking{Remarks: input.Remarks, StartedAt: input.StartedAt, FinishedAt: input.FinishedAt}
	models.DB.Create(&booking)

	c.JSON(http.StatusOK, booking)
}

// UpdateBooking PUT /bookings/:id
func UpdateBooking(c *gin.Context) {
	// Get model if exist
	var booking models.Booking
	if err := models.DB.Where("id = ?", c.Param("id")).First(&booking).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	// validate input
	var input models.UpdateBookingInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	models.DB.Model(&booking).Updates(input)

	c.JSON(http.StatusOK, booking)
}

// DeleteBooking DELETE /bookings/:id
func DeleteBooking(c *gin.Context) {
	// Get model if exist
	var booking models.Booking
	if err := models.DB.Where("id = ?", c.Param("id")).First(&booking).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	models.DB.Delete(&booking)

	c.JSON(http.StatusOK, true)
}
