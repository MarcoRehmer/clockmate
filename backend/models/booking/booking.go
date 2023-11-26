package booking

import (
	"gorm.io/gorm"
)

type Booking struct {
	gorm.Model
	Id         uint   `gorm:"primaryKey"`
	Remarks    string `json:"remarks"`
	StartedAt  string `json:"started_at"`
	FinishedAt string `json:"finished_at"`
}
