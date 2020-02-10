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
    user.set('title', '日记名称');
    user.set('signature', '今天有什么感受');
    return user.signUp();
  }

  initialzeParse(url: string, appId: string, jsKey: string) {
    localStorage.setItem('url', url);
    localStorage.setItem('appId', appId);
    localStorage.setItem('jsKey', jsKey);
    Parse.initialize(appId, jsKey);
    Parse.serverURL = url;
  }
}
