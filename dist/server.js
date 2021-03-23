"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const app = express_1.default();
const path = require("path");
const http = require("http");
const apiRouter = express_1.default.Router();
const bodyParser = require("body-parser");
const booksRouter = require("./api/routes/books");
const Book = require("./models/book");
mongoose_1.default.set("useFindAndModify", false);
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = lowdb(adapter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.set("view engine", "ejs");
//  db connection ---------------------------------------------------
const url = 'mongodb://localhost:27017/library';
const AtlasDB = `mongodb+srv://oushanskeen:${process.env.MONGO_PSWD}@library-database.1irwr.mongodb.net/test?retryWrites=true&w=majority`;
mongoose_1.default.connect(url /*AtlasDB*/, { useNewUrlParser: true, useUnifiedTopology: true });
const mdb = mongoose_1.default.connection;
mdb.once("open", _ => console.log("Library connected: ", url));
mdb.on("error", err => {
    console.error("connection error: ", err);
});
app.use(express_1.default.static(path.join(__dirname, "./public")));
booksRouter(app);
app.use("/books", booksRouter);
const PORT = /*process.env.PORT || */ 3033;
http
    .createServer(app)
    .listen(PORT, () => console.log(`Library server is started on port: ${PORT}.`));
