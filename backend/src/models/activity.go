package models

import (
	"time"
)

// Activity database model
type Activity struct {
	ActivityID uint       `json:"activityID" gorm:"primaryKey"`
	Remarks    *string    `json:"remarks"`
	StartedAt  time.Time  `json:"startedAt" gorm:"not null"`
	FinishedAt *time.Time `json:"finishedAt"`
	User       User
	UserID     uint
	Client     Client
	ClientID   uint
	Project    Project
	ProjectID  uint
}

type CreateActivityInput struct {
	Remarks    *string    `json:"remarks"`
	StartedAt  time.Time  `json:"startedAt" binding:"required"`
	FinishedAt *time.Time `json:"finishedAt"`
	ClientID   *uint      `json:"clientID"`
	ProjectID  *uint      `json:"projectID"`
}

type UpdateActivityInput struct {
	Remarks    *string    `json:"remarks"`
	StartedAt  *time.Time `json:"startedAt"`
	FinishedAt *time.Time `json:"finishedAt"`
}
