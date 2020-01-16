import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Label} from 'src/app/service/label/label';
import {TagManagerComponent} from '../tag-manager/tag-manager.component';

@Component({
  selector: 'app-tag-picker',
  templateUrl: './tag-picker.component.html',
  styleUrls: ['./tag-picker.component.scss'],
})
export class TagPickerComponent implements OnInit {
  @Input() weather: string;
  @Input() emoji: string;
  @Input() favorite: boolean;
  @Input() customLabels: Array<Label>;
  emojiLabels: Array < string >= [
    'icon-cool', 'icon-smile', 'icon-kiss', 'icon-blink', 'icon-sleep',
    'icon-unhappy', 'icon-line', 'icon-angry', 'icon-hurt', 'icon-cry',
    'icon-zip', 'icon-shit'
  ];
  weatherLabels: Array < string >= [
    'icon-duoyun', 'icon-dayu', 'icon-leizhenyu', 'icon-qing',
    'icon-qingzhuanduoyun', 'icon-xiaoyu', 'icon-baoyu', 'icon-bingbao',
    'icon-wanduoyun', 'icon-wu', 'icon-xiaoxue', 'icon-yangsha'
  ];

  constructor(private modalCtrl: ModalController) {}

  async ngOnInit() {
    console.log(this.customLabels);
  }
  selectEmoji(emoji) {
    this.emoji = emoji;
  }
  selectWeather(weather) {
    this.weather = weather;
  }

  async openTagManagerModal() {
    const modal = await this.modalCtrl.create({
      component: TagManagerComponent,
      componentProps: {customLabels: this.customLabels}
    });
    await modal.present();
    const {data} = await modal.onWillDismiss();
    if (data != undefined) {
      console.log(data);
      this.customLabels = data;
    }
  }

  closeModal() {
    this.modalCtrl.dismiss({
      emoji: this.emoji,
      weather: this.weather,
      favorite: this.favorite,
      labels: this.customLabels
    });
  }
}
