package routers

import (
	"taiyu-back-end/src/controlers"

	"github.com/gofiber/fiber/v2"
)
func Setup(app *fiber.App){
	api 	:= app.Group("api")
	admin 	:= api.Group("admin")
	admin.Post("/register", controlers.Register)
	admin.Post("/login",controlers.Login)
	admin.Get("/user", controlers.User)
}