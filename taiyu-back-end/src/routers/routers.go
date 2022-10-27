package routers

import (
	"taiyu-back-end/middlewares"
	"taiyu-back-end/src/controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	api := app.Group("api")
	admin := api.Group("admin")
	admin.Post("/register", controllers.Register)
	admin.Post("/login", controllers.Login)
	adminAuthenticated := admin.Use(middlewares.IsAuthenticated)
	adminAuthenticated.Get("/user", controllers.User)
	adminAuthenticated.Post("/logout", controllers.Logout)
	adminAuthenticated.Put("/users/info", controllers.UpdateInfo)
	adminAuthenticated.Put("/users/password", controllers.UpdatePassword)
	adminAuthenticated.Get("/ambassador", controllers.Ambassador)
	adminAuthenticated.Get("/products", controllers.Products)
	adminAuthenticated.Post("/products", controllers.CreateProducts)
	adminAuthenticated.Get("/products/:id", controllers.GetProduct)
	adminAuthenticated.Put("/products/:id", controllers.UpdateProduct)
	adminAuthenticated.Delete("/products/:id", controllers.DeleteProduct)
	adminAuthenticated.Get("/users/:id/links", controllers.Link)
	adminAuthenticated.Get("orders", controllers.Orders)

	ambassador := api.Group("ambassador")
	ambassador.Post("/register", controllers.Register)
	ambassador.Post("/login", controllers.Login)
	ambassador.Get("products/fontend", controllers.ProductFontEnd)
	ambassador.Get("products/backend", controllers.ProductBackEnd)
	
	ambassadorAuthentication := ambassador.Use(middlewares.IsAuthenticated)
	ambassadorAuthentication.Get("/user", controllers.User)
	ambassadorAuthentication.Post("/logout", controllers.Logout)
	ambassadorAuthentication.Put("/users/info", controllers.UpdateInfo)
	ambassadorAuthentication.Put("/users/password", controllers.UpdatePassword)
	ambassadorAuthentication.Post("links", controllers.CreateLink)
	ambassadorAuthentication.Get("stats", controllers.Stats)
	ambassadorAuthentication.Get("rankings", controllers.Rankings)

	checkout := api.Group("checkout")
	checkout.Get("links/:code", controllers.GetLink)
	checkout.Post("orders", controllers.CreateOrder)
	checkout.Post("orders/confirm", controllers.CreateOrder)
}
 