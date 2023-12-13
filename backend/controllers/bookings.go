package controllers

import (
	"clockmate/backend/models"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
	"time"
)

// FindBookings GET /bookings
func FindBookings(c *gin.Context) {
	var bookings []models.Booking
	dbQuery := models.DB

	// TODO: Needs Code refactoring!

	// check if range from exist and parse to correct format
	rangeFromParam, fromOk := c.GetQuery("rangeFrom")

	// check if range to exist and parse to correct format
	rangeToParam, toOk := c.GetQuery("rangeTo")

	toVal := ""
	if toOk {
		parsedTo, err := time.Parse("2006-01-02", rangeToParam)
		if err != nil {
			toOk = false
			fmt.Println(err)
		}
		toVal = parsedTo.Format(time.RFC3339)
	} else {
		toVal = time.Now().Format(time.RFC3339)
	}

	if fromOk {
		parsedFrom, err := time.Parse("2006-01-02", rangeFromParam)
		if err != nil {
			fromOk = false
			fmt.Println(err)
		}

		fromVal := parsedFrom.Format(time.RFC3339)

		dbQuery = dbQuery.Where("started_at BETWEEN ? AND ?", fromVal, toVal)
	} else if toOk {
		dbQuery = dbQuery.Where("started_at BETWEEN ? AND ?", time.Time{}.Format(time.RFC3339), toVal)
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
