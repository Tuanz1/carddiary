import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {UserService} from 'src/app/service/user/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() name: string;
  @Input() signature: string;
  @Input() img;
  constructor(
      private userService: UserService, private modalCtrl: ModalController) {}

  ngOnInit() {}

  uploadUserAvatar(event) {
    let photo = event.target.files[0];
    this.userService.updateUserAvatar(photo).then(user => {
      this.img = user.get('avatar').url();
    });
  }
  updateUserInfo() {
    this.userService.updateUserInfo(this.name, this.signature);
    this.modalCtrl.dismiss(
        {name: this.name, signature: this.signature, img: this.img});
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }
}
