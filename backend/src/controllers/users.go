package controllers

import (
	"clockmate/backend/models"
	"github.com/gin-gonic/gin"
	"net/http"
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
