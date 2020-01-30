import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Label} from 'src/app/service/label/label';
import {LabelService} from 'src/app/service/label/label.service';

import {TagEditComponent} from '../tag-edit/tag-edit.component';

@Component({
  selector: 'app-tag-manager',
  templateUrl: './tag-manager.component.html',
  styleUrls: ['./tag-manager.component.scss'],
})
export class TagManagerComponent implements OnInit {
  @Input() customLabels: Array<Label>;

  constructor(
      private modalCtrl: ModalController, private labelService: LabelService) {}

  ngOnInit() {}
  async openTagAddModal() {
    const modal = await this.modalCtrl.create({
      component: TagEditComponent,
      componentProps: {name: name},
      cssClass: 'tag-edit-modal'
    });
    await modal.present();
    const {data} = await modal.onWillDismiss();
    if (data != undefined) {
      this.customLabels.push(new Label(this.customLabels.length + 1, data, 0));
      this.labelService.createLabel('custom', data);
    }
  }
  async editTag(index: number, i: number) {
    const modal = await this.modalCtrl.create({
      component: TagEditComponent,
      componentProps: {name: this.customLabels[i].name},
      cssClass: 'tag-edit-modal'
    });
    await modal.present();
    const {data} = await modal.onWillDismiss();
    if (data != undefined) {
      this.customLabels[i].name = data;
      this.labelService.updateLabel(index, data);
    }
  }
  deleteTag(index: number, i: number) {
    this.customLabels.splice(i, 1);
    this.labelService.deleteLabel(index);
  }
  closeModal() {
    this.modalCtrl.dismiss(this.customLabels);
  }
}
