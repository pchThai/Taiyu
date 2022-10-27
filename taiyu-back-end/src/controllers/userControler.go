package controllers

import (
	"taiyu-back-end/src/database"
	"taiyu-back-end/src/models"

	"github.com/gofiber/fiber/v2"
)
func Ambassador( c *fiber.Ctx) error{
	var users []models.User
	database.DB.Where("is_ambassador").Find(&users)
	return c.JSON(users)
}
func Rankings(c *fiber.Ctx) error{
	var users []models.User
	database.DB.Find(&users, models.User{
		IsAmbassador: true,
	})
	var result []interface{}
	for _, user := range users{
		ambassador := models.Ambassador(user)
		ambassador.CaculateRevenue(database.DB)
		result = append(result, fiber.Map{
			user.Name(): ambassador.Revenue,

		})
	}
	return c.JSON(result)	
}