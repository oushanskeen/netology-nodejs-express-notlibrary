require("reflect-metadata");
const Container = require("inversify").Container;
const injectable = require("inversify").injectable;

// EXAPLE FROM LESSON
abstract class ICallUser{
  abstract getUsers():any[];
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
class CallHttp{
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

const callUserFromRepository = container2.get(CallUserFromRepository);
console.log(callUserFromRepository);
callUserFromRepository.fetchList();
