package main

import (
	"taiyu-back-end/src/database"
	"taiyu-back-end/src/routers"

	"github.com/gofiber/fiber/v2"
)

func main() {

	database.Connect()
	database.AutoMigrate()

    app := fiber.New()

	routers.Setup(app)

    app.Listen(":3000")
}