package middlewares

import (
	"strconv"

	"github.com/dgrijalva/jwt-go/v4"
	"github.com/gofiber/fiber/v2"
)
func IsAuthenticated(c *fiber.Ctx) error{
	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte("secrect"), nil
	})
	if err != nil || !token.Valid {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message":"unathorized",
		})
	}
	return c.Next()
}
func GetUserID(c *fiber.Ctx)(uint, error){
	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte("secrect"), nil
	})
	if err != nil || !token.Valid {
		c.Status(fiber.StatusUnauthorized)
		return 0, err
	}
	payload := token.Claims.( *jwt.StandardClaims)
	id, _  := strconv.Atoi(payload.Subject)
	return uint(id) , nil
}