package main

import (
	"taiyu-back-end/src/database"
	"taiyu-back-end/src/routers"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	database.Connect()
	database.AutoMigrate()
	database.SetupRedis()
	database.SetupCacheChanel()
    app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	routers.Setup(app)

    app.Listen(":3000")
}