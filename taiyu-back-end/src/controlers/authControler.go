package controlers

import (
	"strconv"
	"taiyu-back-end/src/database"
	"taiyu-back-end/src/models"
	"time"

	"github.com/dgrijalva/jwt-go/v4"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *fiber.Ctx) error{
	var data map[string]string
	if err := c.BodyParser(&data)

	err != nil{
		return err
	}

	if data["password"] != data["password_confirm"]{
		c.Status(400)
		return c.JSON(fiber.Map{
			"messgae": "passworld do not match",
		})
	}
	 
	password,_ := bcrypt.GenerateFromPassword([]byte(data["password"]),12) 

	user := models.User{
		FristName: data["firstname"],
		LastName: data["lastname"],
		Email: data["email"],
		Password: string(password),
		IsAmbassador: false,
	}
	database.DB.Create(&user)
	
	return c.JSON(user)
}
func Login(c *fiber.Ctx) error{
	var data map[string]string
	err := c.BodyParser(&data)
	if err != nil{
		return err
	}
	var user models.User
	database.DB.Where("email = ?", data["email"]).First(&user)
	if user.Id == 0{
		c.Status(fiber.StatusBadGateway)
		return c.JSON(fiber.Map{
			"message": "Invalid Credentials",
		})
	}
	if err:= bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(data["password"])); err != nil{
		c.Status(fiber.StatusBadGateway)
		return c.JSON(fiber.Map{
			"message":"Invalid Credentials",
		})
	}
	payload := jwt.StandardClaims{
			Subject: strconv.Itoa(int(user.Id)),
			ExpiresAt: jwt.NewTime(float64(time.Now().Add(time.Hour *24 ).Unix())),
	}
	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, payload).SignedString([]byte("secrect"));	
	if err != nil{
		return c.JSON(fiber.Map{
			"message": "Invalid Credentials",
		})
	}
	
	cookie := fiber.Cookie{
		Name: "jwt",
		Value: token,
		Expires: time.Now().Add(time.Hour *24 ),
		HTTPOnly: true,

	}
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message":"Succes",
	})
}