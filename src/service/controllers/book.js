var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
require("reflect-metadata");
var Container = require("inversify").Container;
var injectable = require("inversify").injectable;
var mongoose = require("mongoose");
var http = require("http");
var Book = require("../../models/book");
mongoose.set("useFindAndModify", false);
var container = new Container();
// DIY container
/*
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
*/
var mockedBook = {
    id: "mockID",
    title: "mockTitle",
    description: "mockDescription",
    authors: "mockAuthors",
    favorite: "mockFavorite",
    fileCover: "mockFilecover",
    fileName: "mockFilename",
    fileBook: "mockFilebook"
};
var BookMongooseRepository = /** @class */ (function () {
    function BookMongooseRepository() {
    }
    //testCall(){return true}
    BookMongooseRepository.prototype.getAll = function () {
        return Book.find({});
    };
    BookMongooseRepository.prototype.getOne = function (bookId) {
        return Book.find({ id: bookId });
    };
    BookMongooseRepository.prototype.create = function (bookData) {
        return Book.create(bookData);
    };
    BookMongooseRepository.prototype.update = function (bookId, bookData) {
        return Book.findOneAndUpdate({ id: bookId /*body.id*/ }, { $set: __assign({}, bookData /*body*/) }, { "new": true });
    };
    BookMongooseRepository.prototype["delete"] = function (bookId) {
        return Book.deleteOne({ id: bookId });
    };
    return BookMongooseRepository;
}());
/*
class TestDB {
  insert() {
    return true;
  }
}
class TestService {
  constructor(db) {
    this.db = db;
  }
  create(item) {
    return this.db.insert("items", item);
  }
}
const testDB = new TestDB();
const testService = new TestService(testDB);

//const result = testService.create({id:1});
//console.log("Test the DIY ioc result is: ", result);

ioc.bind("testService", () => new TestService(new TestDB()));
const otherResult = ioc.use("testService").create({ id: 2 });
console.log("Some other DIY ioc example: ", otherResult);
*/
var BookRepository = /** @class */ (function () {
    function BookRepository(db) {
        this.db = db;
    }
    BookRepository.prototype.createBook = function (bookData) {
        return this.db.create(bookData);
    };
    BookRepository.prototype.getOneBook = function (id) {
        return this.db.getOne(id);
    };
    BookRepository.prototype.getAllBooks = function () {
        //return true
        return this.db.getAll();
    };
    BookRepository.prototype.updateBook = function (bookId, bookData) {
        return this.db.update(bookId, bookData);
    };
    BookRepository.prototype.deleteBook = function (bookId) {
        return this.db["delete"](bookId);
    };
    BookRepository.prototype.testCall = function () {
        return "Me test call!";
    };
    BookRepository = __decorate([
        injectable()
    ], BookRepository);
    return BookRepository;
}());
var bookRepository = new BookRepository(new BookMongooseRepository());
container.bind(BookRepository).toSelf();
container.bind(BookMongooseRepository).toSelf();
//const testBookRepository
//ioc.bind("sampleBookRepository", () => new BookRepository(new BookMongooseRepository));
//ioc.bind("bookRepository", () => bookRepository);
var getBooksHandler = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var repo, booksData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                repo = container.get(BookRepository);
                return [4 /*yield*/, repo.getAllBooks()];
            case 1:
                booksData = _a.sent();
                try {
                    res.status(200).json(booksData || "stub books data");
                }
                catch (err) {
                    res.status(500).send(err);
                }
                return [2 /*return*/];
        }
    });
}); };
var getBookCounter = function (bookId) {
    //let data = "";
    //let data =
    var output = "";
    var h = function (some) {
        http.get("http://localhost:3032/counter/" + bookId, "utf-8", function (res) {
            var data = "";
            //console.log("TRESPONSE INSIDE COUNTER: ", res);
            res.on("data", function (chunk) {
                //console.log("DATA CHUNK INSIDE COUNTER: ", chunk);
                data += chunk;
            });
            res.on("end", function () {
                //console.log("COUNTTER REQUEST ENDS WITH DATA: ...");
                some = data;
                console.log("COUNTER REQUEST ENDS WITH DATA: ", data);
                console.log("COUNTER REQUEST ENDS WITH DATA: ", output);
                return output;
            });
            res.on("error", function (err) {
                console.log("Error during HTTP request");
                console.log(err.message);
            });
            return some;
        });
    };
    console.log("FINAL OUTPUT: ", h(output));
    return h(output);
};
var getBookHandler = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        id = req.params.id;
        console.log("BOOK ID: ", id);
        //const booksData = await bookRepository.getOneBook(id);
        //const booksData = await ioc.use("bookRepository").getOneBook(id);
        try {
            res.status(200).json(booksData || "stub book data");
        }
        catch (err) {
            res.status(500).send(err);
        }
        return [2 /*return*/];
    });
}); };
var postBookHandler = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var body;
    return __generator(this, function (_a) {
        console.log("POST BOOK TRIGERED");
        body = req.body;
        //const response = await Book.create(body);
        //const booksData = await bookRepository.createBook(body);
        //const booksData = await ioc.use("bookRepository").createBook(body);
        try {
            res.status(200).json(response || "stub response");
        }
        catch (err) {
            res.status(500).send(err);
        }
        return [2 /*return*/];
    });
}); };
var putBookHandler = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var body, id;
    return __generator(this, function (_a) {
        body = req.body;
        id = req.params.id;
        console.log("PUT BOOK TRIGERED");
        console.log("ID: ", id);
        //const booksData = await bookRepository.updateBook(`${id}`,body);
        //const booksData = await ioc.use("bookRepository").updateBook(`${id}`, body);
        try {
            res.status(200).json(response || "stub reponse");
        }
        catch (err) {
            res.status(500).send(err);
        }
        return [2 /*return*/];
    });
}); };
var deleteBookHandler = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        id = req.params.id;
        //let response = await Book.deleteOne({ id: id });
        //const response = await bookRepository.deleteBook(id);
        //const booksData = await ioc.use("bookRepository").deleteBook(id);
        try {
            res.status(200).json(response || "stub response");
        }
        catch (err) {
            res.status(500).send(err);
        }
        return [2 /*return*/];
    });
}); };
module.exports = {
    getBooksHandler: getBooksHandler,
    getBookHandler: getBookHandler,
    postBookHandler: postBookHandler,
    putBookHandler: putBookHandler,
    deleteBookHandler: deleteBookHandler
};
