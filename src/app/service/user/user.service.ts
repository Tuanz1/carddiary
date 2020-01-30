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
  updateUserAvatar(photo: File): Promise<any> {
    let file = new Parse.File(photo.name, photo);
    Parse.User.current().set('avatar', file);
    return Parse.User.current().save();
  }
  updateUserInfo(name: string, signature: string): Promise<any> {
    let user = Parse.User.current();
    user.set('title', name);
    user.set('signature', signature);
    return user.save();
  }
}
