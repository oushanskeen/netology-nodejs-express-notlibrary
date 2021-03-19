const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");

const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = lowdb(adapter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.set("view engine", "ejs");

app.get("/counter/:bookId", (req, res) => {
  const {bookId} = req.params;
  const mbFound = db.get("books").find({id:bookId}).value()
  const out = mbFound ? mbFound.count : "No such book!";
  res.json(out);
});
app.post("/counter/:bookId/incr",(req,res) => {
  const {bookId} = req.params;
  db.get("books").find({id:bookId}).update("count", x => +x + 1).write();
  res.json(db.get("books").find({id:bookId}).value().count);
});

const PORT = process.env.PORT || 3032;
http
  .createServer(app)
  .listen(PORT, () => 
    console.log(`Counter server is started on port: ${PORT}`)
  );
