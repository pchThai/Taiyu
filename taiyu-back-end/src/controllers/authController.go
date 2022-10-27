package controllers

import (
	"strings"
	"taiyu-back-end/middlewares"
	"taiyu-back-end/src/database"
	"taiyu-back-end/src/models"
	"time"

	"github.com/gofiber/fiber/v2"
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
	 
	

	user := models.User{
		FirstName: data["firstname"],
		LastName: data["lastname"],
		Email: data["email"],
		IsAmbassador: strings.Contains(c.Path(), "/api/ambassador"),
	}
	
	user.SetPassword(data["password"])

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
	if err:= user.CompareHashAndPassword(data["password"]); err != nil{
		c.Status(fiber.StatusBadGateway)
		return c.JSON(fiber.Map{
			"message":"Invalid Credentials",
		})
	}
	isAmbassador := strings.Contains(c.Path(), "/api/ambassador")
	var scope string
	if isAmbassador{
		scope = "ambassador"
	}else{
		scope = "admin"
	}
	if !isAmbassador && user.IsAmbassador{
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message":"unauthorized",
		})
	}
	token, err := middlewares.GenerateJWT(user.Id, scope)
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
func User(c *fiber.Ctx) error{
	id , _ := middlewares.GetUserID(c)

	var user models.User
	database.DB.Where("id = ?",id).First(&user)
	if strings.Contains(c.Path(), "/api/ambassador"){
		ambassador :=  models.Ambassador(user)
		ambassador.CaculateRevenue(database.DB)
		return c.JSON(ambassador)
	}
	return c.JSON(user)
}
func Logout(c *fiber.Ctx) error{
	cookie := fiber.Cookie{
		Name: "jwt",
		Value: "",
		Expires: time.Now().Add(time.Hour *24 ),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message":"Succes",
	})
}
func UpdateInfo(c *fiber.Ctx) error{
	var data map[string]string
	if err := c.BodyParser(&data); err != nil{
		return err
	}
	id, _ := middlewares.GetUserID((c))
	user := models.User{
		FirstName: data["firstname"],
		LastName: data["lastname"],
		Email: data["email"],
	}
	user.Id = id
	database.DB.Model(&user).Updates(&user)
	return c.JSON(user)
}
func UpdatePassword(c *fiber.Ctx) error{
	var data map[string]string
	if err := c.BodyParser(&data); err != nil{
		return err
	}
	
	if data["password"] != data["password_confirm"]{
		c.Status(400)
		return c.JSON(fiber.Map{
			"messgae": "passworld do not match",
		})
	}
	id, _ := middlewares.GetUserID((c))
	user := models.User{
		Password: data["firstname"],
		
	}
	user.Id = id
	user.SetPassword(data["password"])
	database.DB.Model(&user).Updates(&user)
	return c.JSON(user)
}