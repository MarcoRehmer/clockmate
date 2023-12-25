package controllers

import (
	"clockmate/backend/models"
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
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

// FindActivities GET /activities
func FindActivities(c *gin.Context) {
	userId, err := ExtractTokenUserID(c)
	if err != nil {
		return
	}

	var activities []models.Activity
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
		dbQuery = dbQuery.Order("activity_id DESC")
	}

	dbQuery = dbQuery.Where("user_id = ?", userId)
	dbQuery.Find(&activities)

	log.Println("activities", activities)
	c.JSON(http.StatusOK, activities)
	return
}

// CreateActivity POST /activities
func CreateActivity(c *gin.Context) {
	// validate input
	var input models.CreateActivityInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// create activity
	activity := models.Activity{Remarks: input.Remarks, StartedAt: input.StartedAt, FinishedAt: input.FinishedAt}
	models.DB.Create(&activity)

	c.JSON(http.StatusOK, activity)
}

// UpdateActivity PUT /activities/:id
func UpdateActivity(c *gin.Context) {
	// Get model if exist
	var activity models.Activity
	if err := models.DB.Where("id = ?", c.Param("id")).First(&activity).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	// validate input
	var input models.UpdateActivityInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	models.DB.Model(&activity).Updates(input)

	c.JSON(http.StatusOK, activity)
}

// DeleteActivity DELETE /activities/:id
func DeleteActivity(c *gin.Context) {
	// Get model if exist
	var activity models.Activity
	if err := models.DB.Where("id = ?", c.Param("id")).First(&activity).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	models.DB.Delete(&activity)

	c.JSON(http.StatusOK, true)
}
