import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IonReorderGroup, ModalController} from '@ionic/angular';
import {DiaryService} from 'src/app/service/diary/diary.service';

@Component({
  selector: 'app-img-manager',
  templateUrl: './img-manager.component.html',
  styleUrls: ['./img-manager.component.scss'],
})
export class ImgManagerComponent implements OnInit {
  @Input() photos: Array<any>;
  home: number;
  @ViewChild(IonReorderGroup, {static: true}) reorderGroup: IonReorderGroup;
  constructor(
      private modalCtrl: ModalController, private diaryService: DiaryService) {
    this.photos = this.diaryService.diary.get('photos');
  }

  ngOnInit() {
    this.home = 0;
  }
  setHome(i: number) {
    this.home = i;
  }
  doReorder(event) {
    this.photos = event.detail.complete(this.photos);
    console.log(this.home);

    if (this.home == event.detail.from) {
      this.home = event.detail.to;
      // 滑动过多会越界
      if (this.home == this.photos.length) this.home--;
    }
    console.log(this.home);
  }
  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }
  deletePhoto(i: number) {
    this.photos.splice(i, 1);
  }
  closeModal() {
    this.modalCtrl.dismiss({photos: this.photos, home: this.home})
  }
}
