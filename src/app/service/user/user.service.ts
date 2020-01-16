import {Injectable} from '@angular/core';


@Injectable({providedIn: 'root'})
export class UserService {
  constructor() {}
  login(username: string, password: string) {
    return Parse.User.logIn(username, password);
  }
  register(username: string, password: string) {
    let user = new Parse.User();
    user.set('username', username);
    user.set('password', password);
    return user.signUp();
  }
}
