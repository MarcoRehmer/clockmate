package controllers

import (
	"clockmate/backend/models"
	"errors"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// GetAllClients GET /clients
func GetAllClients(c *gin.Context) {
	var clients []models.Client

	err := models.DB.Where(&models.Client{Active: true}).Find(&clients).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		fmt.Printf("error get clients: %v", err)
		c.Status(http.StatusInternalServerError)
		return
	}
	c.JSON(http.StatusOK, clients)
}

// GetClient GET /clients/:id
func GetClient(c *gin.Context) {

}

// CreateClient POST /clients
func CreateClient(c *gin.Context) {
	var input models.ClientInput

	// fmt.Printf("Input Body: %v\n", c.Request.Body)
	// body, _ := io.ReadAll(c.Request.Body)
	// println(string(body))

	if err := c.ShouldBindJSON(&input); err != nil {
		fmt.Printf("error while bind JSON: %v\n", err)
		c.Status(http.StatusBadRequest)
		return
	}

	tx := models.DB.Model(&models.Client{}).Create(&models.Client{
		Name:         input.Name,
		ClientNumber: input.ClientNumber,
		Active:       input.Active,
	})

	if tx.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "cannot create entity"})
		return
	}

	c.Status(http.StatusOK)
}

// UpdateClient PUT /clients/:id
func UpdateClient(c *gin.Context) {

}

// DeleteClient DELETE /clients/:id
func DeleteClient(c *gin.Context) {

}
