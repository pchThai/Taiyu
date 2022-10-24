package models

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)
type User struct{
	Model
	FirstName string 	`json:"firstname"`
	LastName string	  	`json:"lastname"`	
	Password string	 	`json:"-"`
	Email string		`json:"email" gorm:"unique" `
	IsAmbassador bool 	`json:"-"`
	Revenue 	*float64 	`json:"revenue, omitempty" gorm:"-"`
}
func (user *User) SetPassword(password string){
	hashPassword,_ := bcrypt.GenerateFromPassword([]byte(password),12) 
	user.Password = string(hashPassword)
}

func (user *User) CompareHashAndPassword(password string) error{
	return bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
}

func (user *User) Name() string{
	return user.FirstName + " " + user.LastName
}
type Admin User
func (admin *Admin) CaculateRevenue(db *gorm.DB){
	var orders []Order
	db.Preload("OrderItems").Find(&orders, &Order{
		UserId: admin.Id,
		Complete: true,
	})
	var revenue float64
	for _, order := range orders{
		for _, orderItem := range order.OrderItems{
			revenue += orderItem.AdminRevenue
		}
	}
	admin.Revenue = &revenue
}
type Ambassador User

func (ambassador *Ambassador) CaculateRevenue(db *gorm.DB){
	var orders []Order
	db.Preload("OrderItems").Find(&orders, &Order{
		UserId: ambassador.Id,
		Complete: true,
	})
	var revenue float64
	for _, order := range orders{
		for _, orderItem := range order.OrderItems{
			revenue += orderItem.AdminRevenue
		}
	}
	ambassador.Revenue = &revenue
}