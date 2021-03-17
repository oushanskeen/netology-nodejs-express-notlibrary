class Database {
    insert(table, attributes) {
        // inserts record in database
        const isSuccessful = true
        return isSuccessful
    }
}

class UserService {
    constructor(db) {
        this.db = db
    }

    create(user) {
        return this.db.insert('users', user)
    }
}

//const db = new Database
//const userService = new UserService(db)

//const result = userService.create({ id: 1})
//console.log(result)

global.ioc = {
    container: new Map,
    fakes: new Map,
    bind(key, callback) {
        this.container.set(key, {callback, singleton: false})
    },
    singleton(key, callback) {
        this.container.set(key, {callback, singleton: true})
    },
    fake(key, callback) {
        const item = this.container.get(key)
        
        if (!item) {
            throw new Error('item not in ioc container')
        }

        this.fakes.set(key, {callback, singleton: item.singleton})
    },
    restore(key) {
        this.fakes.delete(key)
    },
    use(key) {
        let item = this.container.get(key)
        
        if (!item) {
            throw new Error('item not in ioc container')
        }

        if (this.fakes.has(key)) {
            item = this.fakes.get(key)
        }

        if (item.singleton && !item.instance) {
            item.instance = item.callback()
        }

        return item.singleton ? item.instance : item.callback()
    },
}
/*
class TestableDatabase {
    create() {
        return true
    }
    insert() {
        return true
    }
}
*/

ioc.bind('userService', () => new UserService(new /*Testable*/Database))
const otherResult = ioc.use('userService').create({id: 1})
console.log("OTHER RESULT: ", otherResult);

//ioc.fake('userService', () => new UserService(new TestableDatabase))

//ioc.use('userService').create({id: 1})

//ioc.restore('userService')
