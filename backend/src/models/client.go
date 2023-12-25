package models

type Client struct {
	ClientID     uint    `json:"clientID" gorm:"primaryKey"`
	Name         string  `json:"name" binding:"required" gorm:"type:varchar(100)"`
	ClientNumber *string `json:"clientNumber" gorm:"type:varchar(50)"`
	Active       bool    `json:"active" default:"true" gorm:"default:false"`
}
