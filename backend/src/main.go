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
	corsConfig.AllowCredentials = true

	r.Use(cors.New(corsConfig))

	models.ConnectDatabase()

	v1 := r.Group("/api")
	{
		// activities
		v1.GET("/activities", controllers.FindActivities)
		v1.POST("/activities", controllers.CreateActivity)
		v1.PUT("/activities/:id", controllers.UpdateActivity)
		v1.DELETE("/activities/:id", controllers.DeleteActivity)

		// users
		v1.GET("/users/current", controllers.CurrentUser)

		// auth
		v1.POST("/login", controllers.Login)
	}

	err = r.Run()
	if err != nil {
		return
	}
}
