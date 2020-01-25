import {Injectable} from '@angular/core';

import {Month} from './month';

@Injectable({providedIn: 'root'})
export class CalendarService {
  Calendar = Parse.Object.extend('Calendar');
  calendars: Array<any>;
  constructor() {}
  queryCalendar(year: number): Promise<any> {
    let query = new Parse.Query(this.Calendar);
    query.equalTo('user', Parse.User.current());
    query.equalTo('year', year);
    query.ascending('num');
    query.exclude('img');
    return query.find()
        .then(data => {
          if (data.length == 0) {
            this.calendars = data;
            this.genDefaultCalendar(year);
          } else {
            this.calendars = data;
          }
        })
        .catch(err => {
          alert('主页加载日历出错' + err);
        });
  }
  createCalendar(year: number, month: Month): Promise<any> {
    let calendar = new this.Calendar();
    calendar.set('user', Parse.User.current());
    calendar.set('year', year);
    calendar.set('month', month.num);
    calendar.set('total', month.total);
    calendar.set('write', month.write);
    calendar.set('days', month.days);
    calendar.set('count', month.count);
    calendar.set('background', '#65bbff no-repeat center center');
    calendar.set('cover', '');
    return calendar.save();
  }
  updateCalendarImg(index: number, img: File): Promise<any> {
    this.calendars[index].set('img', new Parse.File(img.name, img));
    return this.calendars[index]
        .save()
        .then(res => {
          let background: string =
              'url(\"' + res.get('img').url() + '\") no-repeat center/100%100%';
          this.calendars[index].set('background', background);
          this.calendars[index].save();
        })
        .catch((err: string) => {
          console.log('CalendarService.updateCalendarImg ERROR' + err);
        })
  }
  async genDefaultCalendar(year: number) {
    for (let i = 1; i <= 12; i++) {
      let offset = new Date(year, i - 1, 1).getDay();
      let total = new Date(year, i, 0).getDate()
      let month = new Month(i, offset, total);
      await this.createCalendar(year, month)
          .then(calendar => {
            this.calendars.push(calendar);
          })
          .catch(err => {
            console.log('gen default calendars error' + err);
          });
    }
  }
  async genWriteCalendar(date: Date) {
    console.log('gen write date' + date);
    let year = date.getFullYear();
    let m = date.getMonth();
    let day = date.getDate();
    for (let i = 1; i <= 12; i++) {
      let offset = new Date(year, i - 1, 1).getDay();
      let total = new Date(year, i, 0).getDate()
      let month = new Month(i, offset, total);
      if (i == m - 1) {
        console.log('Write Calendar');
        month.write[offset + day] = true;
      }
      this.createCalendar(year, month)
          .then(calendar => {
            console.log('create wirte calendar');
          })
          .catch(err => {
            console.log('gen default calendars error' + err);
          });
    }
  }
  wirte(date: Date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    if (year == this.calendars[0].get('year')) {
      let offset = this.calendars[month].get('write').length -
          this.calendars[month].get('total') + day;
      let write = this.calendars[month].get('write');
      write[offset - 1] = true;
      this.calendars[month].set('write', write);
      this.calendars[month].increment('count');
      this.calendars[month].save();
    } else {
      let query = new Parse.Query(this.Calendar);
      query.equalTo('user', Parse.User.current());
      query.equalTo('year', year);
      query.find()
          .then(data => {
            if (data.length == 0) {
              this.genWriteCalendar(date);
            } else {
              data.forEach(calendar => {
                if (calendar.get('month') == month) {
                  let offset = calendar.get('write').length -
                      calendar.get('total') + day;
                  let write = calendar.get('write');
                  write[offset - 1] = true;
                  this.calendars[month].increment('count');
                  calendar.save();
                }
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
    }
  }
  clearWrite(date: Date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    if (year == this.calendars[0].get('year')) {
      let offset = this.calendars[month].get('write').length -
          this.calendars[month].get('total') + day;
      let write = this.calendars[month].get('write');
      write[offset - 1] = false;
      this.calendars[month].set('write', write);
      this.calendars[month].increment('count', -1);
      this.calendars[month].save();
    } else {
      let query = new Parse.Query(this.Calendar);
      query.equalTo('user', Parse.User.current());
      query.equalTo('year', year);
      query.find()
          .then(data => {
            data.forEach(calendar => {
              if (calendar.get('month') == month) {
                let offset =
                    calendar.get('write').length - calendar.get('total') + day;
                let write = calendar.get('write');
                write[offset - 1] = false;
                this.calendars[month].increment('count', -1);
                calendar.save();
              }
            });
          })
          .catch(err => {
            console.log(err);
          });
    }
  }
}