package main

import (
	"clockmate/backend/controllers"
	models "clockmate/backend/models"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/lpernett/godotenv"
	"log"
	"os"
)

func main() {
	err := godotenv.Load()

	r := gin.Default()

	corsOrigin := os.Getenv("CORS_ORIGIN")
	if len(corsOrigin) == 0 {
		log.Fatal("no allowed cors origin in environment found")
	}

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{corsOrigin}

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

	err = r.Run()
	if err != nil {
		return
	}
}
