#! /bin/bash

echo "Hello World"
URL="http://localhost:3031/api/books"
URL2="http://localhost:3031/api/user/login"
MOCKED_BOOK='{
  "id": "0",
  "title": "mockTitle",
  "description": "mockDescription",
  "authors": "mockAuthors",
  "favorite": "mockFavorite",
  "fileCover": "mockFilecover",
  "fileName": "mockFilename",
  "fileBook": "mockFilebook"}';
MOCKED_BOOK2='{
    "id": "0",
    "title": "mockTitle2",
    "description": "mockDescription2",
    "authors": "mockAuthors2",
    "favorite": "mockFavorite2",
    "fileCover": "mockFilecover2",
    "fileName": "mockFilename2",
    "fileBook": "mockFilebook2"
  }';


getAll(){
  curl "$URL"
}
getOneSuccess(){
  curl "$URL/0"
}
getOneFail(){
  curl "$URL/100"
}
postLogin(){
  curl -X POST \
    -v\
    -H "Content-type: application/json" \
    --data '{"id":"1","mail":"test@mail.ru"}'\
    "$URL2"
}

postBook(){
  curl -X POST \
    -H "Content-type: application/json" \
    --data "$MOCKED_BOOK"\
    "$URL"
}
putBook(){
  curl -X PUT \
    -H "Content-type: application/json" \
    --data "$MOCKED_BOOK2" \
    "$URL/0"
};
delete(){
  curl -X DELETE \
    "$URL/0"
}

calls(){
  #printf "\n POST LOGIN\n"
  #postLogin 
  printf "\n"
  printf "\n GET ALL\n"
  getAll
  printf "\n"
  printf "\$ GET ONE BOOK SUCCESS\n"
  getOneSuccess
  printf "\n"
  printf "\$ GET ONE BOOK FAIL\n"
  getOneFail
  printf "\n"
  printf "\n POST BOOK\n"
  postBook 
  printf "\n"
  printf "\n PUT BOOK\n"
  putBook
  printf "\n"
  printf "\n DELETE\n"
  delete
  printf "\n"
}

calls 
#restCalls "dogovors"
