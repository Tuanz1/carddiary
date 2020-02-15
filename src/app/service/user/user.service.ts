import {Injectable} from '@angular/core';
import {Parse} from 'parse';


@Injectable({providedIn: 'root'})
export class UserService {
  constructor() {}
  login(username: string, password: string) {
    localStorage.setItem('login', 'true');
    return Parse.User.logIn(username, password);
  }
  register(username: string, password: string) {
    let user = new Parse.User();
    user.set('username', username);
    user.set('password', password);
    return user.signUp();
  }

  initialzeParse(url: string, appId: string, jsKey: string) {
    localStorage.setItem('url', url);
    localStorage.setItem('appId', appId);
    localStorage.setItem('jsKey', jsKey);
    Parse.initialize(appId, jsKey);
    Parse.serverURL = url;
  }
  getCurUser(): any {
    return Parse.User.current();
  }
  setUserEmail(email: string): Promise<any> {
    let user = Parse.User.current();
    console.log(user);
    user.set('email', email);
    return user.save();
  }
  resetPassword(email: string) {
    let user = Parse.User.current();
    return Parse.User.requestPasswordReset(email);
  }
}
