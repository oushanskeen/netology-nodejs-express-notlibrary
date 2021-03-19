#! /bin/bash

echo "Hello World"
URL="http://localhost:3032/counter"

getCounterGoodRequest(){
  curl "$URL/1"
}
getCounterBadRequest(){
  curl "$URL/4"
}
postCounter(){
  curl -X POST \
    "$URL/1/incr"
}

calls(){
  printf "\n GET COUNTER GOOD REQUEST\n"
  getCounterGoodRequest
  printf "\n"
  printf "\n GET COUNTER BAD REQUEST\n"
  getCounterBadRequest
  printf "\n"
  printf "\$ POST COUNTER\n"
  postCounter
  printf "\n"
}

calls 
