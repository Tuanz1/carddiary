import {Injectable} from '@angular/core';
import {Parse} from 'parse';
import {PhotoService} from '../photo/photo.service';
@Injectable({providedIn: 'root'})
export class DiaryinfoService {
  diaryinfo: any;
  DiaryInfo = Parse.Object.extend('DiaryInfo');
  constructor(private photoService: PhotoService) {}
  async queryUserDiaryInfo(): Promise<any> {
    let query = new Parse.Query(this.DiaryInfo);
    query.include('cover');
    query.equalTo('user', Parse.User.current());
    await query.first().then((data: any) => {
      this.diaryinfo = data;
      console.log(data);
    });
  }
  createDiaryInfo() {
    let diaryinfo = new this.DiaryInfo();
    diaryinfo.set('title', '日记本名称');
    diaryinfo.set('feel', '今天有什么感受');
    diaryinfo.set('user', Parse.User.current());
    diaryinfo.save();
  }

  async updateDiaryInfo(title: string, feel: string, file: File): Promise<any> {
    if (file != null) {
      await this.photoService.uploadPhoto(file)
          .then(data => {
            this.diaryinfo.set('cover', data);
          })
          .catch(err => {
            console.log(err);
          });
    }
    this.diaryinfo.set('title', title);
    this.diaryinfo.set('feel', feel);
    return this.diaryinfo.save();
  }
}
