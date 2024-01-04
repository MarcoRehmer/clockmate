package controllers

import (
	"clockmate/backend/models"
	"fmt"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm/clause"
	"net/http"
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
		dbQuery = dbQuery.Order(clause.OrderByColumn{
			Column: clause.Column{Name: orderByParam["prop"]},
			Desc:   orderByParam["direction"] == "desc"},
		)
	} else {
		dbQuery = dbQuery.Order(clause.OrderByColumn{Column: clause.Column{Name: "started_at"}, Desc: true})
	}

	dbQuery = dbQuery.Where(models.Activity{UserID: userId})
	dbQuery.Find(&activities)

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

	userId, err := ExtractTokenUserID(c)
	if err != nil {
		return
	}

	tx := models.DB.Model(&models.Activity{}).Create(map[string]interface{}{
		"Remarks":    input.Remarks,
		"StartedAt":  input.StartedAt,
		"FinishedAt": input.FinishedAt,
		"ClientID":   input.ClientID,
		"ProjectID":  input.ProjectID,
		"UserID":     userId,
	})

	if tx.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cannot create entity"})
		return
	}

	c.Status(http.StatusOK)
}

// UpdateActivity PUT /activities/:id
func UpdateActivity(c *gin.Context) {
	userId, err := ExtractTokenUserID(c)
	if err != nil {
		return
	}

	// Get model if exist
	var activity models.Activity
	if err = models.DB.Where(models.Activity{UserID: userId}).First(&activity, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	// validate input
	var input models.UpdateActivityInput
	if err = c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	models.DB.Model(&activity).Updates(input)

	c.JSON(http.StatusOK, activity)
}

// DeleteActivity DELETE /activities/:id
func DeleteActivity(c *gin.Context) {
	userId, err := ExtractTokenUserID(c)
	if err != nil {
		return
	}

	// Get model if exist
	var activity models.Activity
	if err = models.DB.Where(models.Activity{UserID: userId}).First(&activity, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	models.DB.Delete(&activity)

	c.JSON(http.StatusOK, true)
}
