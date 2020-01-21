import {Component, OnInit} from '@angular/core';

import {DiaryService} from '../service/diary/diary.service';
import {PhotoService} from '../service/photo/photo.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  tips: string;
  favoriteNum;
  totalNum;
  photos: Array<any> = new Array<any>();
  constructor(
      private diaryService: DiaryService, private photoService: PhotoService) {}
  ngOnInit(): void {
    this.getPhotos();
    this.getFavoriteNum();
    this.getTotalNum();
  }
  getAvatar(): string {
    return Parse.User.current().get('avatar').url();
  }
  getPhotoUrl(index: number) {
    if (this.photos.length == 0 || index >= this.photos.length)
      return '../assets/test/1.jpg';
    else
      return this.photos[index].get('photo').url();
  }

  getTotalNum() {
    return this.diaryService.countDiarys().then(data => this.totalNum = data);
  }
  getFavoriteNum() {
    this.diaryService.countFavoriteDiary()
        .then(data => {
          this.favoriteNum = data;
        })
        .catch(err => {
          alert(err);
        })
  }
  getPhotos() {
    this.photoService.queryPhotos()
        .then(data => {
          this.photos = data;
          console.log(data);
        })
        .catch(err => {
          alert(err);
        });
  }
}