package models

type Client struct {
	ClientID     uint    `json:"clientID" gorm:"primaryKey"`
	Name         string  `json:"name" binding:"required" gorm:"type:varchar(100)"`
	ClientNumber *string `json:"clientNumber" gorm:"type:varchar(50)"`
	Active       bool    `json:"active" gorm:"default:false"`
}

type ClientInput struct {
	Name         string  `json:"name" binding:"required"`
	ClientNumber *string `json:"clientNumber"`
	Active       bool    `json:"active"`
}
