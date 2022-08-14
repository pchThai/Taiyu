package routers

import (
	"taiyu-back-end/middlewares"
	"taiyu-back-end/src/controlers"

	"github.com/gofiber/fiber/v2"
)
func Setup(app *fiber.App){
	api 	:= app.Group("api")
	admin 	:= api.Group("admin")
	admin.Post("/register", controlers.Register)
	admin.Post("/login",controlers.Login)
	adminAuthenticated := admin.Use(middlewares.IsAuthenticated)
	adminAuthenticated.Get("/user", controlers.User)
	adminAuthenticated.Post("/logout",controlers.Logout)
}