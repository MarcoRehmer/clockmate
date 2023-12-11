package controllers

import (
	"clockmate/backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// FindBookings GET /bookings
func FindBookings(c *gin.Context) {
	var bookings []models.Booking

	models.DB.Find(&bookings)

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
