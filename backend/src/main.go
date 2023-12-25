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
		v1.GET("/activities", controllers.FindActivities)
		v1.POST("/activities", controllers.CreateActivity)
		v1.PUT("/activities/:id", controllers.UpdateActivity)
		v1.DELETE("/activities/:id", controllers.DeleteActivity)

		// auth
		v1.POST("/login", controllers.Login)
	}

	err = r.Run()
	if err != nil {
		return
	}
}
