const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookSchema = new Schema({
    id: {type:"string"},
    title: {type:"string"},
    description: {type:"string"},
    authors: {type:"string"},
    favorite: {type:"string"},
    fileCover: {type:"string"},
    fileName: {type:"string"}
  });
const Book = mongoose.model("Book",bookSchema);
module.exports = Book;

