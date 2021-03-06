import {Injectable} from '@angular/core';
import {Parse} from 'parse';
import {CalendarService} from '../calendar/calendar.service';

@Injectable({providedIn: 'root'})
export class DiaryService {
  op: number = 0;
  diary: any;
  diarys: Array<any>;
  Diary = Parse.Object.extend('Diary');
  constructor(private calendarService: CalendarService) {}
  queryDiarysPhoto(start: number, limit: number): Promise<any> {
    let query = new Parse.Query(this.Diary);
    query.equalTo('user', Parse.User.current());
    query.skip(start);
    query.limit(limit);
    query.include('photos');
    query.descending('year');
    return query.find();
  }
  async queryDiarysByKeywords(keywords: string): Promise<any> {
    let query1 = new Parse.Query(this.Diary);
    query1.equalTo('user', Parse.User.current());
    query1.equalTo('title', keywords);
    let query2 = new Parse.Query(this.Diary);
    query2.equalTo('user', Parse.User.current());
    query2.equalTo('content', keywords);
    let query = new Parse.Query.or(query1, query2);
    query.include('photos');
    query.include('labels');
    await query.find()
        .then(diarys => {
          this.diarys = diarys;
        })
        .catch(err => {
          console.log('query diarys err' + err);
        });
  }
  async queryDiarysByLabel(label: any): Promise<any> {
    let labels = new Array();
    labels.push(label);
    let query = new Parse.Query(this.Diary);
    query.equalTo('user', Parse.User.current());
    query.containedIn('labels', labels);
    query.include('photos');
    query.include('labels');
    return query.find()
        .then(diarys => {
          this.diarys = diarys;
        })
        .catch(err => {
          console.log('query diarys err' + err);
        });
  }
  async queryDiarys(year: number, month: number): Promise<any> {
    let query = new Parse.Query(this.Diary);
    query.equalTo('user', Parse.User.current());
    query.equalTo('year', year);
    query.equalTo('month', month);
    query.include('photos');
    query.include('labels');
    query.ascending('day');
    return query.find()
        .then(diarys => {
          this.diarys = diarys;
        })
        .catch(err => {
          console.log('query diarys err' + err);
        });
  }
  queryDiary(date: Date) {
    let query = new Parse.Query(this.Diary);
    query.equalTo('user', Parse.User.current());
    query.equalTo('year', date.getFullYear());
    query.equalTo('month', date.getMonth());
    query.equalTo('day', date.getDate());
    query.include('photos');
    query.include('labels');
    return query.first();
  }
  setDiaryLabels(labels: Array<any>) {
    let oldLabels = this.diary.get('labels');
    for (let i = 0; i < oldLabels.length; i++) {
      oldLabels[i].increment('count', -1);
      oldLabels[i].save();
    }
    for (let i = 0; i < labels.length; i++) {
      labels[i].increment('count');
      labels[i].save();
    }
    this.diary.set('labels', labels);
    this.updateDiary();
  }
  createDiary(date: Date) {
    this.op++;
    let diary = new this.Diary();
    diary.set('user', Parse.User.current());
    diary.set('title', '');
    diary.set('content', '## ');
    diary.set('favorite', false);
    diary.set('home', -1);
    diary.set('year', date.getFullYear());
    diary.set('month', date.getMonth());
    diary.set('day', date.getDate());
    diary.set('labels', []);
    diary.set('photos', []);
    diary.setACL(new Parse.ACL(Parse.User.current()));
    this.calendarService.wirte(date);
    return diary.save();
  }
  updateDiary() {
    return this.diary.save()
        .then(data => {
          this.diary = data;
        })
        .catch(err => {
          console.log('update diary err' + err);
        });
  }
  deleteDiary(diary: any) {
    this.op++;
    let photos = diary.get('photos');
    for (let i = 0; i < photos.length; i++) {
      photos[i].destroy();
    }
    let labels = diary.get('labels');
    for (let i = 0; i < labels.length; i++) {
      labels[i].increment('count', -1);
      labels[i].save();
    }
    this.calendarService.clearWrite(
        new Date(diary.get('year'), diary.get('month'), diary.get('day')));
    diary.destroy();
  }

  countFavoriteDiary(): Promise<any> {
    let query = new Parse.Query(this.Diary);
    query.equalTo('user', Parse.User.current());
    query.equalTo('favorite', true);
    return query.count();
  }
  countDiarys(): Promise<any> {
    let query = new Parse.Query(this.Diary);
    query.equalTo('user', Parse.User.current());
    return query.count();
  }
}
