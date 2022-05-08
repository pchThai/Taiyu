package models

import "golang.org/x/crypto/bcrypt"
type User struct{
	Id uint
	FristName string
	LastName string
	Password string
	Email string
	IsAmbassador bool
}
func (user *User) SetPassword(password string){
	hashPassword,_ := bcrypt.GenerateFromPassword([]byte(password),12) 
	user.Password = string(hashPassword)
}

func (user *User) CompareHashAndPassword(password string) error{
	return bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
}