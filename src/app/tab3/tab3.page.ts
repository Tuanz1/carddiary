import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalController} from '@ionic/angular';

import {DiaryService} from '../service/diary/diary.service';
import {LabelService} from '../service/label/label.service';
import {PhotoService} from '../service/photo/photo.service';

import {UserInfoComponent} from './user-info/user-info.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  segment: string = 'emoji';
  avatar: string;
  title: string;
  signature: string;
  favoriteNum;
  totalNum;
  photos: Array<any>;
  weatherLabels: Array<any> = new Array();
  emojiLabels: Array<any> = new Array();
  customLabels: Array<any> = new Array();
  constructor(
      private diaryService: DiaryService, private photoService: PhotoService,
      private labelService: LabelService, private modalCtrl: ModalController,
      private router: Router, private activatedRoute: ActivatedRoute) {}
  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.refresh == 'true') {
        this.updateData();
      }
    });
  }
  getUserInfo() {
    let user = Parse.User.current();
    this.title = user.get('title');
    this.signature = user.get('signature');
    this.avatar = user.get('avatar').url();
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
  calHeight(count: number): string {
    if (count < 10) {
      return 50 * count / 10 + 'px';
    } else
      return '50px'
  }
  async openUserInfo() {
    const modal = await this.modalCtrl.create({
      component: UserInfoComponent,
      componentProps:
          {name: this.title, signature: this.signature, img: this.avatar}
    });
    await modal.present();
    const {data} = await modal.onDidDismiss();
    if (data != undefined) {
      this.avatar = data.img;
      this.title = data.name;
      this.signature = data.signature;
    }
  }

  async updateData() {
    this.getPhotos();
    this.getFavoriteNum();
    this.getTotalNum();
    this.getUserInfo();
    if (!this.labelService.userLabels) {
      await this.labelService.queryLabels();
    }
    this.weatherLabels = new Array();
    this.emojiLabels = new Array();
    this.customLabels = new Array();
    for (let i = 0; i < this.labelService.userLabels.length; i++) {
      if (this.labelService.userLabels[i].get('type') == 'weather')
        this.weatherLabels.push(this.labelService.userLabels[i]);
      if (this.labelService.userLabels[i].get('type') == 'emoji')
        this.emojiLabels.push(this.labelService.userLabels[i]);
      if (this.labelService.userLabels[i].get('type') == 'custom')
        this.customLabels.push(this.labelService.userLabels[i]);
    }
  }
  getPhotoBackground(index: number): object {
    if (this.photos == undefined || this.photos.length == 0) return {};
    let url = this.photos[index].get('photo').url();
    return {background: 'url(\"' + url + '\") center/100%  no-repeat'};
  }
  async openDiaryListByTag(index: number) {
    if (this.customLabels[index].get('count') <= 0) return;
    await this.diaryService.queryDiarysByLabel(this.customLabels[index]);
    this.router.navigate(['/diary/list']);
  }
}