package models

// User database model
type User struct {
	UserID     uint       `json:"id" gorm:"primaryKey"`
	Email      string     `json:"email;not null"`
	Password   string     `json:"password;not null"`
	FirstName  string     `json:"firstName"`
	LastName   string     `json:"lastName"`
	Active     bool       `json:"active" default:"true"`
	Activities []Activity `gorm:"foreignKey:UserID"`
}
