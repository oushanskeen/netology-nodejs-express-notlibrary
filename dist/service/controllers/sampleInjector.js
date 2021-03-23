"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
require("reflect-metadata");
const Container = require("inversify").Container;
const injectable = require("inversify").injectable;
// EXAPLE FROM LESSON
class ICallUser {
}
let CallUserFromRepository = class CallUserFromRepository {
    constructor(repo) {
        this.repo = repo;
    }
    fetchList() {
        return this.repo.getUsers();
    }
};
CallUserFromRepository = __decorate([
    injectable(),
    __metadata("design:paramtypes", [ICallUser])
], CallUserFromRepository);
let CallDb = class CallDb {
    query(query) {
        console.log(`query ${query}`);
        return [];
    }
};
CallDb = __decorate([
    injectable()
], CallDb);
let CallHttp = class CallHttp {
    get(url) {
        console.log(`fetch from ${url}`);
        return [];
    }
};
CallHttp = __decorate([
    injectable()
], CallHttp);
let CallUserFromDb = class CallUserFromDb {
    constructor(callDb) {
        this.callDb = callDb;
    }
    getUsers() {
        return this.callDb.query("SELECT * FROM users");
    }
};
CallUserFromDb = __decorate([
    injectable(),
    __metadata("design:paramtypes", [CallDb])
], CallUserFromDb);
let CallUserFromHttp = class CallUserFromHttp {
    constructor(callHttp) {
        this.callHttp = callHttp;
    }
    getUSers() {
        return this.callHttp.get("/api/users");
    }
};
CallUserFromHttp = __decorate([
    injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof callHttp !== "undefined" && callHttp) === "function" ? _a : Object])
], CallUserFromHttp);
const container2 = new Container();
container2.bind(CallDb).toSelf();
container2.bind(CallHttp).toSelf();
container2.bind(ICallUser).to(CallUserFromRepository);
container2.bind(CallUserFromRepository).toSelf();
const callUserFromRepository = container2.get(CallUserFromRepository);
console.log(callUserFromRepository);
callUserFromRepository.fetchList();
