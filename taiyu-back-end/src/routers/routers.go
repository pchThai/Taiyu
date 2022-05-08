package routers

import (
	"taiyu-back-end/src/controlers"

	"github.com/gofiber/fiber/v2"
)
func Setup(app *fiber.App){
	api := app.Group("api")
	api.Post("/admin/register", controlers.Register)
}