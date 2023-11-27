package controllers

import (
	"clockmate/backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GET /bookings
func FindBookings(c *gin.Context) {
	var bookings []models.Booking

	models.DB.Find(&bookings)

	c.JSON(http.StatusOK, gin.H{"data": bookings})
}

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

	c.JSON(http.StatusOK, gin.H{"data": booking})
}
