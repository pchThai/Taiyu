package models

import (
	"golang.org/x/crypto/bcrypt"
)
type User struct{
	Id uint `json:"id"`
	FristName string 	`json:"firstname"`
	LastName string	  	`json:"lastname"`	
	Password string	 	`json:"-"`
	Email string		`json:"email" gorm:"unique" `
	IsAmbassador bool 	`json:"-"`
}
func (user *User) SetPassword(password string){
	hashPassword,_ := bcrypt.GenerateFromPassword([]byte(password),12) 
	user.Password = string(hashPassword)
}

func (user *User) CompareHashAndPassword(password string) error{
	return bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
}