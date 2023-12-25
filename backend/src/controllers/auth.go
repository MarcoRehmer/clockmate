package controllers

import (
	"clockmate/backend/models"
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"
)

func Login(c *gin.Context) {
	var input models.LoginInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// try to log in
	var user models.User

	if err := models.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}

	if user.Password != input.Password {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}

	token, err := generateJWT(user.UserID)
	if err != nil {
		c.Status(http.StatusInternalServerError)
		log.Println("Error while generating JWT: ", err)
	}

	c.String(http.StatusOK, token)
	return
}

func ExtractTokenUserID(c *gin.Context) (uint, error) {
	tokenString, err := c.Cookie("token")
	if err != nil {
		log.Println("Error while extracting token: ", err)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return 0, err
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		secret := os.Getenv("JWT_SECRET_KEY")
		if secret == "" {
			return nil, errors.New("JWT_SECRET_KEY not found in env")
		}
		return []byte(secret), nil
	})

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return 0, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return 0, err
	}

	userId, err := strconv.ParseUint(claims["iss"].(string), 10, 32)
	if err != nil {
		log.Println("Error while parsing user ID from token: ", err)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return 0, err
	}

	return uint(userId), nil
}

func generateJWT(userId uint) (string, error) {
	secret := os.Getenv("JWT_SECRET_KEY")
	if secret == "" {
		return "", errors.New("JWT_SECRET_KEY not found in env")
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    strconv.FormatUint(uint64(userId), 10),
		ExpiresAt: time.Now().Add(72 * time.Hour).Unix(),
	})

	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
