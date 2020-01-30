import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IonSlides, ModalController, NavController} from '@ionic/angular';

import {DiaryService} from '../service/diary/diary.service';
import {LabelService} from '../service/label/label.service';
import {PhotoService} from '../service/photo/photo.service';

import {ImgManagerComponent} from './img-manager/img-manager.component';
import {TagPickerComponent} from './tag-picker/tag-picker.component';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})
export class DiaryPage implements OnInit {
  @ViewChild(IonSlides, {static: true}) slides: IonSlides;
  home: number;
  date: string;
  title: string;
  content: string;
  favorite: boolean = false;
  weather: string = 'icon-qing';
  emoji: string = 'icon-smile';
  photos: Array<any> = new Array();
  first: string;
  options = {
    autoplay: {
      delay: 3500,
    },
  };
  constructor(
      private activatedRoute: ActivatedRoute,
      private diaryService: DiaryService, private photoService: PhotoService,
      private labelService: LabelService, private modalCtrl: ModalController,
      private navCtrl: NavController) {}

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.first = params.edit;
      if (params.date == 'none')
        this.date = new Date().toString();
      else
        this.date = new Date(params.date).toString();
    });
    if (!this.labelService.userLabels) {
      await this.labelService.queryLabels();
    }
  }
  clickFavoriteBtn() {
    this.favorite = !this.favorite;
  }
  async openImageManager() {
    const modal = await this.modalCtrl.create({
      component: ImgManagerComponent,
      componentProps: {photos: this.photos, home: this.home}
    });
    await modal.present();
    const {data} = await modal.onWillDismiss();
    this.photos = data.photos;
    this.home = data.home;
    this.diaryService.diary.set('photos', this.photos);
    this.updateDiary();
  }
  async uploadImages(event) {
    let imgs = event.target.files;
    for (let i = 0; i < imgs.length; i++) {
      await this.photoService.uploadPhoto(imgs[i])
          .then(photo => {
            this.diaryService.diary.add('photos', photo);
            this.photos.push(photo);
          })
          .catch(err => {
            alert(err);
          });
    }
    if (this.home == -1) {
      this.home = 0;
    }
    this.updateDiary();
  }
  async deleteImage() {
    let index = await this.slides.getActiveIndex();
    this.photoService.deletePhoto(this.photos[index]);
    if (index == this.home) this.home = 0;
    this.photos.splice(index, 1);
    if (this.photos.length == 0) this.home = -1;
    // 使用remove导致无法删除
    this.diaryService.diary.set('photos', this.photos);
    this.updateDiary();
  }
  //每次修改日期，调用
  switchDiary() {
    if (this.first == 'false') {
      this.changeDiaryDate();
    } else {
      this.loadDiaryData();
      this.first = 'false';
    }
  }
  changeDiaryDate() {
    this.diaryService.queryDiary(new Date(this.date))
        .then(data => {
          if (data) {
            this.diaryService.diary = data;
            this.loadDiaryData();
          } else {
            // 如果没有查询到已经写过日记，则新建
            this.diaryService.createDiary(new Date(this.date))
                .then(data => {
                  this.diaryService.diary = data;
                  this.loadDiaryData();
                })
                .catch(err => {
                  alert(err);
                });
          }
        })
        .catch(err => {
          alert(err);
        });
  }
  // 打开标签管理
  async openTagPickerModal() {
    const modal = await this.modalCtrl.create({
      component: TagPickerComponent,
      componentProps: {
        favorite: this.favorite,
        weather: this.weather,
        emoji: this.emoji,
        customLabels: this.labelService.genDiaryCustomLabels(
            this.diaryService.diary.get('labels')),
      },
      cssClass: 'tag-picker-modal'
    });
    await modal.present();
    const {data} = await modal.onWillDismiss();
    if (data != undefined) {
      this.emoji = data.emoji;
      this.weather = data.weather;
      this.favorite = data.favorite;
      this.diaryService.setDiaryLabels(this.labelService.covertLabels(
          this.weather, this.emoji, data.labels));
      this.updateDiary();
    }
  }
  // 从服务中读取dairy的数据
  loadDiaryData() {
    this.title = this.diaryService.diary.get('title');
    this.content = this.diaryService.diary.get('content');
    this.photos = this.diaryService.diary.get('photos');
    this.favorite = this.diaryService.diary.get('favorite');
    this.home = this.diaryService.diary.get('home');
    let labels = this.diaryService.diary.get('labels');
    for (let i = 0; i < labels.length; i++) {
      if (labels[i].get('type') == 'weather')
        this.weather = labels[i].get('name');
      else if (labels[i].get('type') == 'emoji')
        this.emoji = labels[i].get('name');
    }
  }
  // 保存diary数据
  updateDiary() {
    this.diaryService.diary.set('title', this.title);
    this.diaryService.diary.set('content', this.content);
    this.diaryService.diary.set('favorite', this.favorite);
    this.diaryService.diary.set('home', this.home);
    this.diaryService.updateDiary();
  }
  clickSaveBtn() {
    this.updateDiary();
    this.navCtrl.navigateRoot('/tabs/tab1');
  }
}
