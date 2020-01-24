import {Component, OnInit} from '@angular/core';

import {DiaryService} from '../service/diary/diary.service';
import {LabelService} from '../service/label/label.service';
import {PhotoService} from '../service/photo/photo.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  segment: string = 'emoji';
  tips: string;
  favoriteNum;
  totalNum;
  photos: Array<any> = new Array<any>();
  weatherLabels: Array<any> = new Array();
  emojiLabels: Array<any> = new Array();
  customLabels: Array<any> = new Array();
  constructor(
      private diaryService: DiaryService, private photoService: PhotoService,
      private labelService: LabelService) {}
  async ngOnInit() {
    this.getPhotos();
    this.getFavoriteNum();
    this.getTotalNum();
    if (!this.labelService.userLabels) {
      await this.labelService.queryLabels();
    }
    for (let i = 0; i < this.labelService.userLabels.length; i++) {
      if (this.labelService.userLabels[i].get('type') == 'weather')
        this.weatherLabels.push(this.labelService.userLabels[i]);
      if (this.labelService.userLabels[i].get('type') == 'emoji')
        this.emojiLabels.push(this.labelService.userLabels[i]);
      if (this.labelService.userLabels[i].get('type') == 'custom')
        this.customLabels.push(this.labelService.userLabels[i]);
    }
  }
  getAvatar(): string {
    return Parse.User.current().get('avatar').url();
  }
  getPhotoUrl(index: number) {
    if (this.photos.length == 0 || index >= this.photos.length)
      return '../assets/test/1.jpg';
    else {
      return this.photos[index].get('photo').url();
    }
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