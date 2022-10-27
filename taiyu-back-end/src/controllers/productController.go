package controllers

import (
	"context"
	"encoding/json"
	"sort"
	"strconv"
	"strings"
	"taiyu-back-end/src/database"
	"taiyu-back-end/src/models"
	"time"

	"github.com/gofiber/fiber/v2"
)
func Products(c *fiber.Ctx) error{
	var products []models.Product
	database.DB.Find(&products)
	return c.JSON(products)
}
func CreateProducts(c *fiber.Ctx) error{
	var product models.Product
	if err := c.BodyParser(&product); err != nil{
		return err
	}
	database.DB.Create(&product)
	go database.CleanCache("products_fontend", "products_backend")
	return c.JSON(product)
}
func GetProduct(c *fiber.Ctx) error{
	id, _ := strconv.Atoi(c.Params("id"))
	var product models.Product
	product.Id = uint(id)
	database.DB.Find(&product)
	return c.JSON(product)
}
func UpdateProduct(c *fiber.Ctx) error{
	id, _ := strconv.Atoi(c.Params("id"))
	product := models.Product{}
	product.Id = uint(id)
	if err := c.BodyParser(&product); err != nil{
		return err
	}
	database.DB.Model(&product).Updates(&product)
	go database.CleanCache("products_fontend", "products_backend")
	return c.JSON(product)
}
func DeleteProduct(c *fiber.Ctx) error{
	id, _ := strconv.Atoi(c.Params("id"))
	product := models.Product{}
	product.Id = uint(id)
	database.DB.Delete(&product)
	go database.CleanCache("products_fontend", "products_backend")
	return nil
}
func ProductFontEnd(c *fiber.Ctx) error{
	var products []models.Product
	var ctx = context.Background()
	result, err := database.Cache.Get(ctx, "products_frontend").Result()
	if err != nil{
		database.DB.Find(&products)
		bytes, err := json.Marshal(products)
		if err != nil{
			panic(err)
		}
		if err := database.Cache.Set(ctx,"products_frontend",bytes,30 * time.Minute).Err(); err != nil{
			panic(err)
		}
	}else{
		json.Unmarshal([]byte(result),&products)
	}
	return c.JSON(products)
}
func ProductBackEnd(c *fiber.Ctx) error{
	var products []models.Product
	var ctx = context.Background()
	result, err := database.Cache.Get(ctx, "products_backend").Result()
	if err != nil{
		database.DB.Find(&products)
		bytes, err := json.Marshal(products)
		if err != nil{
			panic(err)
		}
		database.Cache.Set(ctx,"products_backend",bytes,30 * time.Minute)
	}else{
		json.Unmarshal([]byte(result),&products)
	}
	var searchProducts []models.Product
	if s:= c.Query("s"); s != ""{
		lower := strings.ToLower(s)
		for _, product := range products{
			if strings.Contains(strings.ToLower(product.Title),lower)|| strings.Contains(strings.ToLower(product.Description),lower){
				searchProducts = append(searchProducts, product)
			}
		}
	}else{
		searchProducts = products
	}
	if sortParam := c.Query("sort"); sortParam != ""{
		sortLower := strings.ToLower(sortParam)
		if sortLower == "asc"{
			sort.Slice(searchProducts, func(i, j int) bool {
				return searchProducts[i].Price < searchProducts[j].Price
			})
		}else if sortLower == "desc"{
			sort.Slice(searchProducts, func(i, j int) bool {
				return searchProducts[i].Price > searchProducts[j].Price
			})
		}
	}
	var total = len(searchProducts)
	page, _ := strconv.Atoi(c.Query("page","i"))
	perPage := 9
	var data []models.Product = searchProducts
	if total <= page * perPage && total >= (page-1)*perPage{
		data = searchProducts[(page -1)*perPage: total]
	}else if total >= page*perPage{
		data = searchProducts[(page-1)*perPage:page*perPage]
	} else{
		data = []models.Product{}
	}
	return c.JSON(fiber.Map{
		"data":data[(page -1)*perPage:page*perPage],
		"total":total,
		"page":page,
		"last_page": total/perPage,
	})
}