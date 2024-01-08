package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type SummaryValue struct {
	Hours   uint `json:"hours"`
	Minutes uint `json:"minutes"`
}

func FetchSummary(c *gin.Context) {

	c.JSON(http.StatusOK, gin.H{
		"today": SummaryValue{Hours: 3, Minutes: 42},
		"week":  SummaryValue{Hours: 25, Minutes: 15},
		"month": SummaryValue{Hours: 130, Minutes: 58},
	})
}
