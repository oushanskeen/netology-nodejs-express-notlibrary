const axios = require("axios");
//require("reflect-metadata");
//const Container = require("inversify").Container;
//const injectable = require("inversify").injectable;

const mongoose = require("mongoose");
const http = require("http");
const Book = require("../../models/book");
mongoose.set("useFindAndModify", false);
//const container = new Container();

// EXAPLE FROM LESSON
/*
abstract class ICallUser{
  abstract getUsers(): any[];
}
@injectable()
class CallUserFromRepository{
  constructor(private readonly repo: ICallUser){}
  fetchList():any[]{
    return this.repo.getUsers()
  }
}
@injectable()
class CallDb{
  query(query:string):any[]{
    console.log(`query ${query}`);
    return [];
  }
}
@injectable()
class CallHttp(){
  get(url:string):any[]{
    console.log(`fetch from ${url}`);
    return [];
  }
}
@injectable()
class CallUserFromDb implements ICallUser{
  constructor(private callDb: CallDb){}
  getUsers():any[]{
    return this.callDb.query("SELECT * FROM users");
  }
}
@injectable()
class CallUserFromHttp implements ICallUser{
  constructor(private callHttp: callHttp){}
  getUSers():any[]{
    return this.callHttp.get("/api/users");
  }
}
const container2 = new Container();
container2.bind(CallDb).toSelf();
container2.bind(CallHttp).toSelf();
container2.bind(ICallUser).to(CallUserFromRepository);
container2.bind(CallUserFromRepository).toSelf();

const userService = container2.get(UserService);
console.log(userService);
userService.fetchList();
*/

// DIY container
global.ioc = {
  container: new Map(),
  fakes: new Map(),
  bind(key, callback) {
    this.container.set(key, { callback, singleton: false });
  },
  singleton(key, callback) {
    this.container.set(key, { callback, singleton: true });
  },
  fake(key, callback) {
    const item = this.container.get(key);
    if (!item) {
      throw new Error("item not in ioc container");
    }
    this.fakes.set(key, { callback, singleton: item.singleton });
  },
  restore(key) {
    this.fakes.delete(key);
  },
  use(key) {
    let item = this.container.get(key);
    if (!item) {
      throw new Error("item not in ioc container");
    }
    if (this.fakes.has(key)) {
      item = this.fakes.get(key);
    }
    if (item.singleton && !item.instance) {
      item.instance = item.callback();
    }
    return item.singleton ? item.instance : item.callback();
  }
};
const mockedBook = {
  id: "mockID",
  title: "mockTitle",
  description: "mockDescription",
  authors: "mockAuthors",
  favorite: "mockFavorite",
  fileCover: "mockFilecover",
  fileName: "mockFilename",
  fileBook: "mockFilebook"
};

class BookMongooseRepository {
  //testCall(){return true}
  getAll() {
    return Book.find({});
  }
  getOne(bookId) {
    return Book.find({ id: bookId });
  }
  create(bookData) {
    return Book.create(bookData);
  }
  update(bookId, bookData) {
    return Book.findOneAndUpdate(
      { id: bookId /*body.id*/ },
      { $set: { ...bookData /*body*/ } },
      { new: true }
    );
  }
  delete(bookId) {
    return Book.deleteOne({ id: bookId });
  }
}
class BookRepository {
  constructor(db) {
    this.db = db;
  }
  createBook(bookData) {
    return this.db.create(bookData);
  }
  getOneBook(id) {
    return this.db.getOne(id);
  }
  getAllBooks() {
    //return true
    return this.db.getAll();
  }
  updateBook(bookId, bookData) {
    return this.db.update(bookId, bookData);
  }
  deleteBook(bookId) {
    return this.db.delete(bookId);
  }
  testCall() {
    return "Me test call!";
  }
}

const bookRepository = new BookRepository(new BookMongooseRepository());
//container.bind(BookRepository).toSelf();
//container.bind(BookMongooseRepository).toSelf();
//const testBookRepository
//ioc.bind("bookRepository", () => new BookRepository(new BookMongooseRepository));
ioc.bind("bookRepository", () => bookRepository);
const getBooksHandler = async (req, res) => {
  //const booksData = await Book.find({});
  //const booksData = await bookRepository.getAllBooks();
  const booksData = await ioc.use("bookRepository").getAllBooks();
  //console.log("SO BOOK DATA: ", booksData);
  //const repo = container.get(BookRepository);
  //const booksData = await repo.getAllBooks();
  try {
    res.status(200).json(booksData || "stub books data");
  } catch (err) {
    res.status(500).send(err);
  }
};

const COUNTER_PORT = 
  process.env.COUNTER_PORT || "http://localhost:3032";
const getBookCounter = async bookId =>
  await axios
    .get(`${COUNTER_PORT}/counter/${bookId}`)
    .then(res => res.data)
    .catch(err => err.message)
const setBookCounter = async bookId =>
  await axios
    .post(`http://localhost:3032/counter/${bookId}/incr`)
    .then(res => res.data)
    .catch(err => err.message)

const getBookHandler = async (req, res) => {
  const { id } = req.params;
  console.log("BOOK ID: ", id);
  //const booksData = await bookRepository.getOneBook(id);
  //const booksData = await ioc.use("bookRepository").getOneBook(id);
  const counterData = await getBookCounter(id);
  setBookCounter(id);
  console.log("COUNTER DATA: ", counterData);
  try {
    res.status(200).json({/*bookData:booksData && "stub book",*/ count:counterData} || "stub book data");
  } catch (err) {
    res.status(500).send(err);
  }
};
const postBookHandler = async (req, res) => {
  console.log("POST BOOK TRIGERED");
  const { body } = req;
  //const response = await Book.create(body);
  //const booksData = await bookRepository.createBook(body);
  //const booksData = await ioc.use("bookRepository").createBook(body);
  try {
    res.status(200).json(response || "stub response");
  } catch (err) {
    res.status(500).send(err);
  }
};
const putBookHandler = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  console.log("PUT BOOK TRIGERED");
  console.log("ID: ", id);
  //const booksData = await bookRepository.updateBook(`${id}`,body);
  //const booksData = await ioc.use("bookRepository").updateBook(`${id}`, body);
  try {
    res.status(200).json(response || "stub reponse");
  } catch (err) {
    res.status(500).send(err);
  }
};
const deleteBookHandler = async (req, res) => {
  const { id } = req.params;
  //let response = await Book.deleteOne({ id: id });
  //const response = await bookRepository.deleteBook(id);
  //const booksData = await ioc.use("bookRepository").deleteBook(id);
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
