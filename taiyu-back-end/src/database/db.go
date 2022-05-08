package database

import (
	"taiyu-back-end/src/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)
var DB *gorm.DB 
func Connect(){
	var err error
	DB, err = gorm.Open(mysql.Open("root:root@tcp(db:3306)/taiyu"), &gorm.Config{}) 
	if err != nil{
		panic("Could connect with DB")
	}
}
func AutoMigrate(){
	DB.AutoMigrate(models.User{})
}