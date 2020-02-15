import {Injectable} from '@angular/core';
import {Parse} from 'parse';
@Injectable({providedIn: 'root'})
export class PhotoService {
  op: number = 0;
  Photo = Parse.Object.extend('Photo');
  photos: Array<any>;
  constructor() {}
  uploadPhoto(file: File): Promise<any> {
    this.op++;
    let photo = new this.Photo();
    photo.set('user', Parse.User.current());
    photo.set('photo', new Parse.File(file.name, file));
    return photo.save();
  }
  deletePhoto(photo: any): Promise<any> {
    if (photo.id == 'ELvp8uH96J') return;
    this.op++;
    return photo.destroy();
  }
  queryPhotos(): Promise<any> {
    let query = new Parse.Query(this.Photo);
    query.equalTo('user', Parse.User.current());
    query.descending('updatedAt');
    query.limit(5);
    return query.find();
  }
}
