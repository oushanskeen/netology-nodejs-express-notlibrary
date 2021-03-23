/*
interface SayHello {
  say(): string;
}
*/
/*
class Hello{
  //private trueSayHello;
  constructor(f){
    this.f = f;
  }
  sayHello(){
    f//()
    //console.log("Hello You Bastard!")
  }
}

const hello1 = new Hello();
hello1.sayHello(console.log("Me True Hello!"));
*/
class Database {
    insert(table, attributes) {
        // inserts record in database
        // ...

        const isSuccessful = true
        return isSuccessful
    }
}

class UserService {
    create(user) {
        // do a lot of validation etc.
        // ...

        const db = new Database
        return db.insert('users', user)
    }
}

const userService = new UserService
const result = userService.create({ id: 1})
console.log(result)

class MongooseDatabase {
  getAll() {
    return "All"//isSuccessful
  }
}

class Repository {
  constructor(db){
    this.db = db;
  }
  getAll() {
    return this.db.getAll()
  }
}

const currentRepository = new Repository(new MongooseDatabase)
const newResult = currentRepository.getAll()
console.log(newResult)
