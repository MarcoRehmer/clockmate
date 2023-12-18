package models

import "time"

type Booking struct {
	ID         uint       `json:"id" gorm:"primaryKey"`
	Remarks    *string    `json:"remarks"`
	StartedAt  time.Time  `json:"startedAt"`
	FinishedAt *time.Time `json:"finishedAt"`
}

type CreateBookingInput struct {
	Remarks    *string    `json:"remarks"`
	StartedAt  time.Time  `json:"startedAt" binding:"required"`
	FinishedAt *time.Time `json:"finishedAt"`
}

type UpdateBookingInput struct {
	Remarks    *string    `json:"remarks"`
	StartedAt  *time.Time `json:"startedAt"`
	FinishedAt *time.Time `json:"finishedAt"`
}
