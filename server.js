const express = require("express");
const multer = require("multer");
const upload = multer({dest:"uploads/"});
const app = express();
const path = require("path");
const http = require("http");
const apiRouter = express.Router();
const bodyParser = require("body-parser");

const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = lowdb(adapter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "./public")));

const makeBook = (book) => ({
  id:book[0],
  title:book[0],
  description:book[0],
  authors:book[0],
  favorite:book[0],
  fileCover:book[0],
  fileName:book[0],
  fileBook:book[0],
});
// db methods
const getBooks = () => db.get("books").value();
const postUser = payload =>
 db
   .get("users")
    .push({ ...payload })
    .write();
const getUser = id =>
  db
    .get("users")
    .find({ id: id })
    .value();
const getBook = id =>
  db
    .get("books")
    .find({ id: id })
    .value();
const addBook = book =>
  db
    .get("books")
    .push(book)
    .write();
const putBook = (id, payload) =>
  db
    .get("books")
    .find({ id: id })
    .assign({ content: payload })
    .write();
const deleteBook = id =>
  db
    .get("books")
    .remove({ id: id })
    .write();

// api calls
apiRouter.post("/api/user/login", (req, res) => {
  postUser(req.body);
  res.status(201).json(getUser(req.body.id));
});
const getBooksController = (req, res, next) => {
  const out = res.json(getBooks());
  console.log("getBooksController out: ", out);
  //next();
};
apiRouter.get("/books", (req,res,next) => getBooksController(req,res,next));


const getBookController = (req, res) => {
  const book = getBook(req.params.id);
  book === undefined ? res.status(404).send("Not found!") : res.json(book);
};
apiRouter.get("/books/:id", /*(req,res) => /*getBookController(req,res)*/(req, res) => {
  const book = getBook(req.params.id);
  book === undefined 
    ? res.status(404).send("Not found!") 
    : res.send(/*render("view.ejs",{book:book}*/res.json(book));
});
apiRouter.post("/book", upload.single("bookFile"), (req, res) => {
  const dbBooks = getBooks();
  console.log("On Post Body: ", JSON.stringify(req.body));
  console.log("On Post File: ", JSON.stringify(req.file));
  const newId = `${+dbBooks.slice(-1)[0].id + 1}`;
  //const newBook = { id: newId, ...req.body };
  const newBook = { id: newId, metaInfo:req.body, fileInfo:req.file };
  const newLib = [...dbBooks, { ...newBook }];
  addBook(newBook);
  res.json(getBook(newId));
});
apiRouter.put("/books/:id", (req, res) => {
  const bookYouNeed = getBooks().filter(e => e.id === req.params.id)[0];
  const newBook = { id: req.params.id, ...req.body };
  putBook(req.params.id, req.body.content);
  bookYouNeed === undefined
    ? res.status(404).send("Nothing to change!")
    : res.json(getBook(req.params.id));
});
apiRouter.get("/book/delete/:id", (req,res) => {
  res.redirect()
});
apiRouter.delete("/books/:id", (req, res) => {
  console.log("Delete book action triggered!");
  deleteBook(req.params.id);
  //res.end("Ok");
  res.redirect("/index");
});
apiRouter.get('/books/:id/download',(req,res)=>{
  const book = getBook(req.params.id);
  console.log("Book to download: ", book);
  res.download(`${__dirname}/${book.fileInfo.path}`);
})

// views
//app.get("/index", (req,res) => res.render("index.ejs",{books:["bookeOne", "bookTwo","bookThree"]}));
app.get('/', (req,res) => res.redirect("/index"));
app.get('/index', async (req,res, next) => {
  res.render(
    "index.ejs",
    {books:getBooks()}
  )
});
app.get("/view", (req,res) => 
  res.render("view.ejs",{book:"single stub book"})
);
app.get("/create", (req,res) => res.render("create.ejs"));
app.get("/update/:id", (req,res) => {
  const book = getBook(req.params.id);
  console.log("Book for update: ", book);
  res.render("update.ejs",{book:book})
});

app.use("/api", apiRouter);
//app.use("/", apiRouter);

const PORT = process.env.PORT || 3031;
http
  .createServer(app)
  .listen(PORT, () =>
    console.log(`Library server is started on port: ${PORT}.`)
  );
