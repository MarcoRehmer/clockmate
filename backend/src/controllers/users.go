package controllers

import (
	"clockmate/backend/models"
	"fmt"
	"net/http"
	"os"

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
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
		return
	}

	models.DB.Model(&currentUser).Updates(input)
}

func ChangePassword(c *gin.Context) {
	// validate input
	var input models.ChangePasswordInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
		return
	}

	userId, err := ExtractTokenUserID(c)
	if err != nil {
		return
	}

	var currentUser models.User
	if err = models.DB.First(&currentUser, userId).Error; err != nil {
		c.Status(http.StatusForbidden)
		return
	}

	// check current password
	if currentUser.Password != input.CurrentPassword {
		c.JSON(http.StatusBadRequest, gin.H{"error": "wrong current password"})
	}

	// set new password
	models.DB.Model(&currentUser).Updates(models.User{Password: input.NewPassword})
	c.Status(http.StatusOK)
	c.Value(true)
}

func UploadAvatar(c *gin.Context) {

}

func GetAvatar(c *gin.Context) {
	var user models.User
	if err := models.DB.First(&user, c.Param("id")).Error; err != nil {
		c.Status(http.StatusForbidden)
		return
	}

	body, err := os.ReadFile(fmt.Sprintf("media/avatars/%v.png", user.AvatarImageID))
	if err != nil {
		fmt.Printf("Error read image: %v", err)
		c.Status(http.StatusNotFound)
		return
	}

	c.Data(http.StatusOK, "image/png", body)
}
