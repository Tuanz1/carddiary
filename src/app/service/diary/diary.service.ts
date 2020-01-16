import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class DiaryService {
  diary: any;
  diarys: Array<any>;
  Diary = Parse.Object.extend('Diary');
  constructor() {}
  queryDiarys(year: number, month: number) {
    console.log('query diarys');
    let query = new Parse.Query(this.Diary);
    query.equalTo('user', Parse.User.current());
    query.equalTo('year', year);
    query.equalTo('month', month);
    return query.find();
  }
  queryDiary(date: Date) {
    console.log('query diary' + date);
    let query = new Parse.Query(this.Diary);
    query.equalTo('user', Parse.User.current());
    query.equalTo('year', date.getFullYear());
    query.equalTo('month', date.getMonth());
    query.equalTo('day', date.getDate());
    query.include('photos');
    query.include('labels');
    return query.first();
  }
  createDiary(date: Date) {
    console.log('创建日记' + date);
    let diary = new this.Diary();
    diary.set('user', Parse.User.current());
    diary.set('title', '');
    diary.set('content', '');
    diary.set('favorite', false);
    diary.set('year', date.getFullYear());
    diary.set('month', date.getMonth());
    diary.set('day', date.getDate());
    diary.set('labels', []);
    diary.set('photos', []);
    return diary.save();
  }
  updateDiary() {
    return this.diary.save()
        .then(data => {
          console.log('更新日记');
          console.log(data);
          this.diary = data;
        })
        .catch(err => {
          console.log('update diary err' + err);
        });
  }
}
