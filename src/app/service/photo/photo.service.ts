import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class PhotoService {
  Photo = Parse.Object.extend('Photo');
  photos: Array<any>;
  constructor() {}
  uploadPhoto(file: File): Promise<any> {
    let photo = new this.Photo();
    photo.set('user', Parse.User.current());
    photo.set('photo', new Parse.File(file.name, file));
    return photo.save();
  }
  deletePhoto(photo: any): Promise<any> {
    return photo.destroy();
  }
  queryPhotos(): Promise<any> {
    let query = new Parse.Query(this.Photo);
    query.equalTo('user', Parse.User.current());
    return query.find()
        .then(data => {
          this.photos = data;
        })
        .catch(err => {
          console.log('查询photos' + err);
        });
  }
}
