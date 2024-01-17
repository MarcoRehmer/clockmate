package controllers

import (
	"clockmate/backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CurrentUser(c *gin.Context) {
	userId, err := ExtractTokenUserID(c)
	if err != nil {
		return
	}

	var currentUser models.User

	if err = models.DB.First(&currentUser, userId).Error; err != nil {
		c.Status(http.StatusForbidden)
		return
	}

	userInfo := models.UserInfo{
		UserID:    currentUser.UserID,
		Email:     currentUser.Email,
		Active:    currentUser.Active,
		FirstName: currentUser.FirstName,
		LastName:  currentUser.LastName,
	}

	c.JSON(http.StatusOK, userInfo)
}

func ChangeUserInfo(c *gin.Context) {
	userId, err := ExtractTokenUserID(c)
	if err != nil {
		return
	}

	var currentUser models.User

	if err = models.DB.First(&currentUser, userId).Error; err != nil {
		c.Status(http.StatusForbidden)
		return
	}

	// validate input
	var input models.UserInfo
	if err = c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	models.DB.Model(&currentUser).Updates(input)
}
