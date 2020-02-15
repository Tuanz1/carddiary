import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

import {DiaryService} from '../service/diary/diary.service';
import {PhotoPreviewComponent} from '../share/photo-preview/photo-preview.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  photoList: Array<Array<any>> = new Array();
  finish: boolean = false;
  empty: boolean = false;
  diaryList: any;
  // 开始年份和结束年份
  start: number;
  end: number;
  // 检索后台图片
  begin: number = 0;
  step: number = 20;
  constructor(
      private diaryService: DiaryService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.queryPhotos(0, this.step);
  }
  queryPhotos(start: number, limit: number) {
    this.diaryService.queryDiarysPhoto(start, limit)
        .then(data => {
          if (data.length == 0) {
            this.empty = true;
            return;
          }
          this.diaryList = data;
          this.start = data[0].get('year');
          this.end = this.start;
          this.addToList(data);
          this.begin += this.step;
        })
        .catch(err => {
          console.log('查询日记图片失败');
          console.log(err);
        });
  }
  addToList(data: any) {
    length = data.length;
    let end: number = data[length - 1].get('year');
    if (this.start - end + 1 >= this.photoList.length) {
      for (let i = 0; i < this.end - end + 1; i++) {
        let tmp: Array < any >= new Array();
        for (let j = 0; j < 12; j++) {
          tmp.push(new Array());
        }
        this.photoList.push(tmp);
      }
      this.end = end;
    }
    for (let i = 0; i < length; i++) {
      let index = this.start - data[i].get('year');
      let month = data[i].get('month');
      if (data[i].get('photos').length > 0) {
        this.photoList[index][month].push(data[i]);
      }
    }
  }
  loadData(event) {
    this.diaryService.queryDiarysPhoto(this.begin, this.step)
        .then(data => {
          if (data.length <= this.step) {
            this.finish = true;
          } else {
            this.diaryList = data;
            this.start = data[0].get('year');
            this.end = this.start;
            this.addToList(data);
            this.start += data.length;
          }
        })
        .catch(err => {
          console.log('查询日记图片失败');
          console.log(err);
        })
        .finally(() => {
          event.target.complete();
        });
  }

  async openPhotoPreview(diary: any) {
    const modal = await this.modalCtrl.create({
      component: PhotoPreviewComponent,
      componentProps: {photos: diary.get('photos')}
    });
    modal.present();
    await modal.onWillDismiss();
  }
}
