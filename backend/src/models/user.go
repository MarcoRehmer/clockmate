package models

// User database model
type User struct {
	UserID        uint       `json:"userID" gorm:"primaryKey"`
	Username      string     `json:"username" gorm:"unique"`
	Email         string     `json:"email" gorm:"size:255;not null;unique"`
	Password      string     `json:"password" gorm:"size:255;not null"`
	FirstName     string     `json:"firstName"`
	LastName      string     `json:"lastName"`
	Active        bool       `json:"active" default:"true"`
	Activities    []Activity `gorm:"foreignKey:UserID"`
	AvatarImageID string     `json:"avatarImageID"`
}

type UserInfo struct {
	UserID        uint   `json:"userID"`
	Username      string `json:"username"`
	Email         string `json:"email"`
	FirstName     string `json:"firstName"`
	LastName      string `json:"lastName"`
	Active        bool   `json:"active"`
	AvatarImageID string `json:"avatarImageID"`
}

type ChangePasswordInput struct {
	CurrentPassword string `json:"currentPassword"`
	NewPassword     string `json:"newPassword"`
}
