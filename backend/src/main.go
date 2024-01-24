package main

import (
	"clockmate/backend/controllers"
	models "clockmate/backend/models"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/lpernett/godotenv"
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
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	models.ConnectDatabase()

	v1 := r.Group("/api")
	{
		// auth
		v1.POST("/login", controllers.Login)

		// activities
		v1.GET("/activities", controllers.FindActivities)
		v1.GET("/activities/current", controllers.CurrentActivity)
		v1.POST("/activities", controllers.CreateActivity)
		v1.PUT("/activities/:id", controllers.UpdateActivity)
		v1.DELETE("/activities/:id", controllers.DeleteActivity)

		// users
		v1.GET("/users/current", controllers.CurrentUser)
		v1.PUT("/users/:id", controllers.ChangeUserInfo)
		v1.POST("/users/change-password", controllers.ChangePassword)
		v1.GET("/users/avatar/:id", controllers.GetAvatar)
		v1.POST("/users/avatar", controllers.UploadAvatar)

		// reports
		v1.GET("/reports/summary", controllers.FetchSummary)

		// clients
		v1.GET("/clients", controllers.GetAllClients)
		v1.GET("/clients/:id", controllers.GetClient)
		v1.POST("/clients", controllers.CreateClient)
		v1.PUT("/clients/:id", controllers.UpdateClient)
		v1.DELETE("/clients/:id", controllers.DeleteClient)

		// projects
		v1.GET("/projects", controllers.GetAllProjects)
		v1.GET("/projects/:id", controllers.GetProject)
		v1.POST("/projects", controllers.CreateProject)
		v1.PUT("/projects/:id", controllers.UpdateProject)
		v1.DELETE("/projects/:id", controllers.DeleteProject)
	}

	admin := v1.Group("/admin")
	{
		admin.POST("/users", controllers.CreateUser)
	}

	err = r.Run()
	if err != nil {
		return
	}
}
