package controllers

import (
	"clockmate/backend/models"
	"errors"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// GetAllProjects GET /projects
func GetAllProjects(c *gin.Context) {
	var projects []models.Project

	err := models.DB.Where(&models.Project{Active: true}).Find(&projects).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		fmt.Printf("error get projects: %v", err)
		c.Status(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, projects)
}

// GetProject GET /projects/:id
func GetProject(c *gin.Context) {

}

// CreateProject POST /projects
func CreateProject(c *gin.Context) {
	var input models.ProjectInput

	// body, _ := io.ReadAll(c.Request.Body)
	// println(string(body))

	if err := c.ShouldBindJSON(&input); err != nil {
		fmt.Printf("error while bind JSON: %v\n", err)
		c.Status(http.StatusBadRequest)
		return
	}

	tx := models.DB.Model(&models.Project{}).Create(&models.Project{
		Title: input.Title,
		// Description: input.Description,
		// ClientID:    input.ClientID,
		Active: input.Active,
	})

	if tx.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "cannot create entity"})
		return
	}
}

// UpdateProject PUT /projects/:id
func UpdateProject(c *gin.Context) {

}

// DeleteProject DELETE /projects/:id
func DeleteProject(c *gin.Context) {

}
