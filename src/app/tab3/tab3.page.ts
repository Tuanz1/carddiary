import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalController} from '@ionic/angular';

import {DiaryService} from '../service/diary/diary.service';
import {DiaryinfoService} from '../service/diaryinfo/diaryinfo.service';
import {LabelService} from '../service/label/label.service';
import {PhotoService} from '../service/photo/photo.service';
import {DiaryInfoComponent} from './diary-info/diary-info.component';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  segment: string = 'weather';
  coverUrl: string;
  title: string;
  feel: string;
  favoriteNum: number;
  totalNum: number;
  photos: Array<any>;
  weatherLabels: Array<any> = new Array();
  emojiLabels: Array<any> = new Array();
  customLabels: Array<any> = new Array();
  constructor(
      private diaryInfoService: DiaryinfoService,
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
  async doRefresh(event) {
    await this.updateData();
    setTimeout(() => {
      event.target.complete();
    }, 800);
  }
  async getDiaryInfo() {
    await this.diaryInfoService.queryUserDiaryInfo();
    this.title = this.diaryInfoService.diaryinfo.get('title');
    this.feel = this.diaryInfoService.diaryinfo.get('feel');
    this.coverUrl =
        this.diaryInfoService.diaryinfo.get('cover').get('photo').url();
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
        })
        .catch(err => {
          alert(err);
        });
  }
  calHeight(count: number): string {
    if (count < 10) {
      return 50 * count / 10 + 'px';
    } else
      return '50px';
  }
  async openUserInfo() {
    const modal = await this.modalCtrl.create({
      component: DiaryInfoComponent,
      componentProps: {title: this.title, feel: this.feel, img: this.coverUrl}
    });
    await modal.present();
    await modal.onDidDismiss();
    this.getDiaryInfo();
  }

  async updateData() {
    this.getPhotos();
    this.getFavoriteNum();
    this.getTotalNum();
    this.getDiaryInfo();
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
    if (this.photos == undefined || this.photos.length < index + 1) return {};
    let url = this.photos[index].get('photo').url();
    return {background: 'url(\"' + url + '\") center/100%  no-repeat'};
  }
  async openDiaryListByTag(index: number) {
    if (this.customLabels[index].get('count') <= 0) return;
    await this.diaryService.queryDiarysByLabel(this.customLabels[index]);
    this.router.navigate(['/diary/list']);
  }
}