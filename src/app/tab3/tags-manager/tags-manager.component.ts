import {Component, Input, OnInit} from '@angular/core';
import {ActionSheetController, ModalController} from '@ionic/angular';
import {LabelService} from 'src/app/service/label/label.service';
import {TagEditComponent} from 'src/app/share/tag-edit/tag-edit.component';

@Component({
  selector: 'app-tags-manager',
  templateUrl: './tags-manager.component.html',
  styleUrls: ['./tags-manager.component.scss'],
})
export class TagsManagerComponent implements OnInit {
  customLabels: Array<any>;
  constructor(
      private actionCtrl: ActionSheetController,
      private labelService: LabelService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.customLabels = new Array();
    for (let i = 0; i < this.labelService.userLabels.length; i++) {
      if (this.labelService.userLabels[i].get('type') == 'custom')
        this.customLabels.push(this.labelService.userLabels[i]);
    }
  }
  dismiss() {
    this.modalCtrl.dismiss('');
  }
  async openTagAddModal() {
    const modal = await this.modalCtrl.create({
      component: TagEditComponent,
      componentProps: {name: name},
      cssClass: 'tag-edit-modal'
    });
    await modal.present();
    const {data} = await modal.onWillDismiss();
    if (data != undefined) {
      this.labelService.createLabel('custom', data).then(data => {
        this.customLabels.push(data);
        this.labelService.userLabels.push(data);
      });
    }
  }
  async editTag(i: number) {
    const modal = await this.modalCtrl.create({
      component: TagEditComponent,
      componentProps: {name: this.customLabels[i].get('name')},
      cssClass: 'tag-edit-modal'
    });
    await modal.present();
    const {data} = await modal.onWillDismiss();
    if (data != undefined) {
      this.customLabels[i].set('name', data);
      this.customLabels[i].save();
    }
  }
  deleteTag(i: number) {
    this.labelService.deleteLabelById(this.customLabels[i].id);
    this.customLabels.splice(i, 1);
  }

  async openActionSheet(index: number) {
    const actionSheet = await this.actionCtrl.create({
      header: '操作',
      buttons: [
        {
          text: '编辑',
          icon: 'create',
          handler: () => {
            this.editTag(index);
          }
        },
        {
          text: '删除',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.deleteTag(index);
          }
        },
        {
          text: '取消',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            this.actionCtrl.dismiss();
          }
        }
      ]
    });
    await actionSheet.present();
  }
}
