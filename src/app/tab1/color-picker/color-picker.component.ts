import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit {
  @Input() color: string;
  colors = [
    '#65dbbf', '#65bbff', '#6c65ff', '#6c67ff', '#fe65cf', '#ff669f',
    '#ff6565', '#ff8965', '#ffb466', '#b9e986', '#87e99e', '#87e9d0',
    '#86dce9', '#87e9d0', '#86dce9', '#d2d2d2', '#b7b7b7', '#999999',
    '#6c6c6c', '#373737', '#111111'
  ];
  data: object = {
    'type': '',
    'data': '',
  };
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.color = this.color.substr(0, 7);
  }
  /**
   * 配置button颜色
   * @param index 下标
   */
  getColor(index: number): object {
    return {'background': this.colors[index]};
  }
  selected(index: number): boolean {
    if (this.colors[index] == this.color)
      return true;
    else
      return false;
  }
  selectColor(index: number) {
    this.data['type'] = 'color';
    this.data['data'] = this.colors[index] + ' no-repeat center center';
    this.modalCtrl.dismiss(this.data);
  }
  selectImage(event) {
    let photo = event.target.files[0];
    this.data['type'] = 'image';
    this.data['data'] = photo;
    this.modalCtrl.dismiss(this.data);
  }
}
