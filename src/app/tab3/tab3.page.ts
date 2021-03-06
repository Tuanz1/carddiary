import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalController} from '@ionic/angular';

import {DiaryService} from '../service/diary/diary.service';
import {DiaryinfoService} from '../service/diaryinfo/diaryinfo.service';
import {ErrorService} from '../service/error/error.service';
import {LabelService} from '../service/label/label.service';
import {PhotoService} from '../service/photo/photo.service';

import {DiaryInfoComponent} from './diary-info/diary-info.component';
import {TagsManagerComponent} from './tags-manager/tags-manager.component';


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
  photos: Array < any >= new Array(5);
  weatherLabels: Array<any> = new Array();
  emojiLabels: Array<any> = new Array();
  customLabels: Array<any> = new Array();
  constructor(
      private diaryInfoService: DiaryinfoService,
      private diaryService: DiaryService, private photoService: PhotoService,
      private labelService: LabelService, private modalCtrl: ModalController,
      private errorService: ErrorService, private router: Router,
      private activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    this.activatedRoute.url.subscribe(url => {
      this.updateData();
    });
    this.updateDataForce();
  }

  async doRefresh(event) {
    this.updateDataForce();
    event.target.complete();
  }
  async getDiaryInfo() {
    await this.diaryInfoService.queryUserDiaryInfo();
    this.title = this.diaryInfoService.diaryinfo.get('title');
    this.feel = this.diaryInfoService.diaryinfo.get('feel');
    this.coverUrl =
        this.diaryInfoService.diaryinfo.get('cover').get('photo').url();
  }

  getTotalNum() {
    return this.diaryService.countDiarys()
        .then(data => this.totalNum = data)
        .catch(err => {
          this.errorService.displayErrorAlert(err);
        })
  }
  getFavoriteNum() {
    this.diaryService.countFavoriteDiary()
        .then(data => {
          this.favoriteNum = data;
        })
        .catch(err => {
          this.errorService.displayErrorAlert(err);
        })
  }
  async getPhotos() {
    await this.photoService.queryPhotos()
        .then(data => {
          this.photos = data;
        })
        .catch(err => {
          this.errorService.displayErrorAlert(err);
        });
  }
  async getLabels() {
    await this.labelService.queryLabels();
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
  calHeight(count: number): string {
    if (count == 0) return '5px';
    if (count < 10) {
      return 50 * count / 10 + 5 + 'px';
    } else
      return '55px';
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
    if (this.diaryService.op > 0) {
      this.getTotalNum();
      this.getFavoriteNum();
      this.diaryService.op = 0;
    }
    if (this.photoService.op > 0) {
      this.getPhotos();
      this.photoService.op = 0;
    }
    if (this.labelService.op > 0) {
      this.getLabels();
      this.labelService.op = 0;
    }
  }
  updateDataForce() {
    this.getDiaryInfo();
    this.getFavoriteNum();
    this.getTotalNum();
    this.getLabels();
    this.getPhotos();
  }

  async openDiaryListByTag(index: number) {
    if (this.customLabels[index].get('count') <= 0) return;
    await this.diaryService.queryDiarysByLabel(this.customLabels[index]);
    this.router.navigate(['/diary/list']);
  }
  async openTagsManager() {
    const modal = await this.modalCtrl.create({
      component: TagsManagerComponent,
      componentProps: {customLabels: this.customLabels}
    });
    await modal.present();
    const {data} = await modal.onWillDismiss();
    if (data != undefined) {
      this.customLabels = new Array();
      for (let i = 0; i < this.labelService.userLabels.length; i++) {
        if (this.labelService.userLabels[i].get('type') == 'custom')
          this.customLabels.push(this.labelService.userLabels[i]);
      }
    }
  }
  displayErrorImg(event) {
    event.target.src = 'assets/imgs/error.jpg';
  }
}
