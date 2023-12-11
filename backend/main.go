package main

import (
	"clockmate/backend/controllers"
	models "clockmate/backend/models"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/lpernett/godotenv"
	"log"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env File")
	}

	r := gin.Default()

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"http://localhost:3000"}

	r.Use(cors.New(corsConfig))

	models.ConnectDatabase()

	// bookings
	v1 := r.Group("/api")
	{
		v1.GET("/bookings", controllers.FindBookings)
		v1.POST("/bookings", controllers.CreateBooking)
		v1.PUT("/bookings/:id", controllers.UpdateBooking)
		v1.DELETE("/bookings/:id", controllers.DeleteBooking)

		// auth
		v1.POST("/login", controllers.Login)
	}

	err = r.Run("localhost:8080")
	if err != nil {
		return
	}
}
