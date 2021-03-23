import express from "express";
import mongoose  from 'mongoose';
const multer = require("multer");
const upload = multer({dest:"uploads/"});
const app = express();
const path = require("path");
const http = require("http");
const apiRouter = express.Router();
const bodyParser = require("body-parser");
const booksRouter = require("./api/routes/books");

const Book = require("./models/book");
mongoose.set("useFindAndModify", false);


const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = lowdb(adapter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.set("view engine", "ejs");

//  db connection ---------------------------------------------------
const url = 'mongodb://localhost:27017/library';
const AtlasDB = `mongodb+srv://oushanskeen:${process.env.MONGO_PSWD}@library-database.1irwr.mongodb.net/test?retryWrites=true&w=majority`
mongoose.connect(
  url/*AtlasDB*/,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const mdb = mongoose.connection;
mdb.once("open", _ => console.log("Library connected: ", url));
mdb.on("error", err => {
  console.error("connection error: ", err);
})

app.use(express.static(path.join(__dirname, "./public")));

booksRouter(app);
app.use("/books",booksRouter);

const PORT = /*process.env.PORT || */3033;
http
  .createServer(app)
  .listen(PORT, () =>
    console.log(`Library server is started on port: ${PORT}.`)
  );
