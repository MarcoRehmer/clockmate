package controllers

import (
	"clockmate/backend/models"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
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
		UserID:        currentUser.UserID,
		Email:         currentUser.Email,
		Active:        currentUser.Active,
		FirstName:     currentUser.FirstName,
		LastName:      currentUser.LastName,
		AvatarImageID: currentUser.AvatarImageID,
	}

	c.JSON(http.StatusOK, userInfo)
}

// TODO: move to admin controllers
func CreateUser(c *gin.Context) {
	var input models.UserInput

	if err := c.ShouldBindJSON(&input); err != nil {
		fmt.Printf("error while bind JSON: %v\n", err)
		c.Status(http.StatusBadRequest)
		return
	}

	tx := models.DB.Model(&models.User{}).Create(&models.User{
		Email:     input.Email,
		Password:  input.Password,
		FirstName: input.FirstName,
		LastName:  input.LastName,
		Active:    input.Active,
	})

	if tx.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "cannot create entity"})
		return
	}

	c.Status(http.StatusOK)
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
}

func UploadAvatar(c *gin.Context) {
	userId, err := ExtractTokenUserID(c)
	if err != nil {
		return
	}

	var currentUser models.User
	if err = models.DB.First(&currentUser, userId).Error; err != nil {
		c.Status(http.StatusForbidden)
		return
	}

	file, err := c.FormFile("file")
	if err != nil {
		fmt.Printf("Error upload avatar: %v\n", err)
		c.Status(http.StatusBadRequest)
		return
	}

	avatarID := uuid.New()
	err = c.SaveUploadedFile(file, fmt.Sprintf("media/avatars/%v.jpg", avatarID))
	if err != nil {
		fmt.Printf("Error upload avatar: %v\n", err)
		c.Status(http.StatusInternalServerError)
		return
	}

	oldAvatarID := currentUser.AvatarImageID
	models.DB.Model(&currentUser).Updates(models.User{AvatarImageID: avatarID.String()})

	// remove old avatar file
	os.Remove(fmt.Sprintf("media/avatars/%v.jpg", oldAvatarID))

	c.Status(http.StatusOK)
	c.Value(avatarID)
}

func GetAvatar(c *gin.Context) {
	body, err := os.ReadFile(fmt.Sprintf("media/avatars/%v.jpg", c.Param("id")))
	if err != nil {
		fmt.Printf("Error read image: %v\n", err)
		c.Status(http.StatusNotFound)
		return
	}

	c.Data(http.StatusOK, "image/jpeg", body)
}
