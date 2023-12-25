package models

// Project database model
type Project struct {
	ProjectID   uint    `gorm:"primaryKey"`
	Title       string  `gorm:"type:VARCHAR(100);not null"`
	Description *string `gorm:"type:text"`
	Active      bool    `gorm:"type:boolean" default:"true"`
	ClientID    *uint
	Client      Client `gorm:"foreignKey:ClientID"`
}
