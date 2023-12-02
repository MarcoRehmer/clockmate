package main

import (
	"clockmate/backend/controllers"
	models "clockmate/backend/models"
	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"http://localhost:3000"}

	r.Use(cors.New(corsConfig))

	models.ConnectDatabase()

	r.GET("/bookings", controllers.FindBookings)
	r.POST("/bookings", controllers.CreateBooking)

	err := r.Run("localhost:8080")
	if err != nil {
		return
	}
}
