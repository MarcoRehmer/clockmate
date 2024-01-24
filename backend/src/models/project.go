package models

// Project database model
type Project struct {
	ProjectID   uint    `json:"projectID" gorm:"primaryKey"`
	Title       string  `json:"title" gorm:"type:VARCHAR(100);not null"`
	Description *string `json:"description" gorm:"type:text"`
	Active      bool    `json:"active" gorm:"type:boolean" default:"true"`
	ClientID    *uint   `json:"clientID"`
	Client      Client  `json:"-"`
}

type ProjectInput struct {
	Title       string  `json:"title"`
	Description *string `json:"description"`
	Active      bool    `json:"active"`
	ClientID    *uint   `json:"clientID"`
}
