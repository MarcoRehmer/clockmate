package main

import (
	"clockmate/backend/controllers"
	models "clockmate/backend/models"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	models.ConnectDatabase()

	r.GET("/bookings", controllers.FindBookings)
	r.POST("/bookings", controllers.CreateBooking)
	r.Run("localhost:8080")
}
