package models

type User struct {
	ID        uint   `json:"id" gorm:"primaryKey"`
	Email     string `json:"email" binding:"required"`
	Password  string `json:"password" binding:"required"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Active    bool   `json:"active" default:"true"`
}
