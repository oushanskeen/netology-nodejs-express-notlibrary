const mongoose = require("mongoose");
const Book = require("../../models/book");
mongoose.set("useFindAndModify", false);

const getBooksHandler = async (req, res) => {
  const booksData = await Book.find({});
  try {
    res.status(200).json(booksData || "stub books data");
  } catch (err) {
    res.status(500).send(err);
  }
};
const getBookHandler = async (req, res) => {
  const { id } = req.params;
  const bookData = await Book.find({ id: id });
  try {
    res.status(200).json(bookData || "stub book data");
  } catch (err) {
    res.status(500).send(err);
  }
};
const postBookHandler = async (req, res) => {
  console.log("POST BOOK TRIGERED");
  const { body } = req;
  const response = await Book.create(body);
  try {
    res.status(200).json(response || "stub response");
  } catch (err) {
    res.status(500).send(err);
  }
};
const putBookHandler = async (req, res) => {
  const { body } = req;
  const response = await Book.findOneAndUpdate(
    { id: body.id },
    { $set: { ...body } },
    { new: true }
  );
  try {
    res.status(200).json(response || "stub reponse");
  } catch (err) {
    res.status(500).send(err);
  }
};
const deleteBookHandler = async (req, res) => {
  const { id } = req.params;
  let response = await Book.deleteOne({ id: id });
  try {
    res.status(200).json(response || "stub response");
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getBooksHandler,
  getBookHandler,
  postBookHandler,
  putBookHandler,
  deleteBookHandler
};
