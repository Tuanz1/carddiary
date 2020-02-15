import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.scss'],
})
export class PhotoPreviewComponent implements OnInit {
  @Input() photos: Array<any>;
  options = {
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 3500,
    },
  };
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}
  close() {
    this.modalCtrl.dismiss();
  }
}
