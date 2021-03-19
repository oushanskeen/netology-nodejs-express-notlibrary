var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
require("reflect-metadata");
var Container = require("inversify").Container;
var injectable = require("inversify").injectable;
// EXAPLE FROM LESSON
var ICallUser = /** @class */ (function () {
    function ICallUser() {
    }
    return ICallUser;
}());
var CallUserFromRepository = /** @class */ (function () {
    function CallUserFromRepository(repo) {
        this.repo = repo;
    }
    CallUserFromRepository.prototype.fetchList = function () {
        return this.repo.getUsers();
    };
    CallUserFromRepository = __decorate([
        injectable()
    ], CallUserFromRepository);
    return CallUserFromRepository;
}());
var CallDb = /** @class */ (function () {
    function CallDb() {
    }
    CallDb.prototype.query = function (query) {
        console.log("query " + query);
        return [];
    };
    CallDb = __decorate([
        injectable()
    ], CallDb);
    return CallDb;
}());
var CallHttp = /** @class */ (function () {
    function CallHttp() {
    }
    CallHttp.prototype.get = function (url) {
        console.log("fetch from " + url);
        return [];
    };
    CallHttp = __decorate([
        injectable()
    ], CallHttp);
    return CallHttp;
}());
var CallUserFromDb = /** @class */ (function () {
    function CallUserFromDb(callDb) {
        this.callDb = callDb;
    }
    CallUserFromDb.prototype.getUsers = function () {
        return this.callDb.query("SELECT * FROM users");
    };
    CallUserFromDb = __decorate([
        injectable()
    ], CallUserFromDb);
    return CallUserFromDb;
}());
var CallUserFromHttp = /** @class */ (function () {
    function CallUserFromHttp(callHttp) {
        this.callHttp = callHttp;
    }
    CallUserFromHttp.prototype.getUSers = function () {
        return this.callHttp.get("/api/users");
    };
    CallUserFromHttp = __decorate([
        injectable()
    ], CallUserFromHttp);
    return CallUserFromHttp;
}());
var container2 = new Container();
container2.bind(CallDb).toSelf();
container2.bind(CallHttp).toSelf();
container2.bind(ICallUser).to(CallUserFromRepository);
container2.bind(CallUserFromRepository).toSelf();
var callUserFromRepository = container2.get(CallUserFromRepository);
console.log(callUserFromRepository);
callUserFromRepository.fetchList();
