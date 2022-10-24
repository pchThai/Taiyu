package database

import (
	"context"
	"time"

	"github.com/go-redis/redis/v8"
)



var Cache *redis.Client
var CacheChanel chan string 


func SetupRedis(){
	Cache = redis.NewClient(&redis.Options{
		Addr:"redis:6379",
		DB:0,
	})
}

func SetupCacheChanel(){
	CacheChanel = make(chan string)
	go func(ch chan string) {
		for{
			time.Sleep(5 * time.Second)
			key := <- ch
			Cache.Del(context.Background(), key)
		}
	}(CacheChanel)
}

func CleanCache(keys ...string){
	for _, key := range keys{
		CacheChanel<- key
	}
}