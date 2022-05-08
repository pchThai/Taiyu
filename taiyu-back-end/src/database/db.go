package database

import(
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)
func Connect(){
	_, err := gorm.Open(mysql.Open("root:root@tcp(db:3306)/taiyu"), &gorm.Config{}) 
	if err != nil{
		panic("Could connect with DB")
	}
}