package models
type Link struct{
	Model
	Code string `json:"code"`
	UserId uint `json:"userid"`
	User User 	`json:"user" gorm:"foreignKey:UserId"`
	Products []Product 	`json:"products" gorm:"many2many:link_products"`
	Order []Order `json:"orders,omitempty" gorm:"-"`
}