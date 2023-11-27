package models

import "time"

type Booking struct {
	ID         uint      `json:"id" gorm:"primaryKey"`
	Remarks    string    `json:"remarks"`
	StartedAt  time.Time `json:"started_at"`
	FinishedAt time.Time `json:"finished_at"`
}

type CreateBookingInput struct {
	Remarks    string    `json:"remarks" binding:"required"`
	StartedAt  time.Time `json:"started_at" binding:"required"`
	FinishedAt time.Time `json:"finished_at"`
}
