import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IonReorderGroup, ModalController} from '@ionic/angular';
import {PhotoPreviewComponent} from 'src/app/share/photo-preview/photo-preview.component';

@Component({
  selector: 'app-img-manager',
  templateUrl: './img-manager.component.html',
  styleUrls: ['./img-manager.component.scss'],
})
export class ImgManagerComponent implements OnInit {
  @Input() photos: Array<any>;
  @Input() home: number;
  @ViewChild(IonReorderGroup, {static: true}) reorderGroup: IonReorderGroup;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}
  setHome(i: number) {
    this.home = i;
  }
  doReorder(event) {
    this.photos = event.detail.complete(this.photos);
    if (this.home == event.detail.from) {
      this.home = event.detail.to;
      // 滑动过多会越界
      if (this.home == this.photos.length) this.home--;
    }
  }
  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }
  deletePhoto(i: number) {
    if (i == this.home) this.home = 0;
    this.photos.splice(i, 1);
    if (this.home >= this.photos.length) this.home = -1;
  }
  closeModal() {
    this.modalCtrl.dismiss({photos: this.photos, home: this.home})
  }

  async openPhotoPreview() {
    const modal = await this.modalCtrl.create({
      component: PhotoPreviewComponent,
      componentProps: {photos: this.photos}
    });
    modal.present();
    await modal.onWillDismiss();
  }
}
