import {Component, Input} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {DiaryinfoService} from 'src/app/service/diaryinfo/diaryinfo.service';

@Component({
  selector: 'app-diary-info',
  templateUrl: './diary-info.component.html',
  styleUrls: ['./diary-info.component.scss'],
})
export class DiaryInfoComponent {
  @Input() title: string;
  @Input() feel: string;
  @Input() img: any;
  photo: File = null;
  constructor(
      private diaryInfoService: DiaryinfoService,
      private modalCtrl: ModalController) {}

  uploadUserAvatar(event) {
    this.photo = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.photo);
    fileReader.onload = ev => {
      this.img = ev['target']['result'];
    }
  }
  updateUserInfo() {
    this.diaryInfoService.updateDiaryInfo(this.title, this.feel, this.photo)
        .then(data => {
          console.log('更新日记本信息成功');
          console.log(data);
          this.modalCtrl.dismiss();
        })
        .catch(err => {
          console.log('更新日记本信息失败');
        });
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }
}
