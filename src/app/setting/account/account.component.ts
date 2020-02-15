import {Component, OnInit} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {UserService} from 'src/app/service/user/user.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  username: string = '';
  verifyEmail: boolean = false;
  email: string;
  refresh: boolean = true;
  constructor(
      private toastCtrl: ToastController, private userSerivce: UserService,
      private modalCtrl: ModalController) {}

  ngOnInit() {
    let user = this.userSerivce.getCurUser();
    this.username = user.get('username');
    let verifyEmail = user.get('emailVerified')
    if (verifyEmail == undefined) {
      this.verifyEmail = false;
      this.refresh = true;
    }
    else if (verifyEmail == false) {
      this.verifyEmail = false;
      this.refresh = true;
      this.email = user.get('email');
    }
    else {
      this.verifyEmail = true;
      this.refresh = false;
      this.email = user.get('email');
    }
  }
  /**
   * 设置用户邮箱
   */
  verifyEmailAdress() {
    this.userSerivce.setUserEmail(this.email)
        .then(data => {
          this.refresh = true;
          console.log(data);
        })
        .catch(err => {
          this.showTip(err, 3000);
        })
  }
  refreshUserInfo() {
    this.userSerivce.getCurUser()
        .fetch()
        .then(async data => {
          console.log(data);
          this.showTip('邮箱验证状态为' + data.get('emailVerified'), 3000);
        })
        .catch(err => {
          this.showTip(err, 3000);
        });
  }
  resetPassword() {
    this.userSerivce.resetPassword(this.email)
        .then(async () => {
          this.showTip('重置密码邮件已经发送到您的邮箱。', 3000);
        })
        .catch(async err => {
          this.showTip(err, 3000);
        });
  }
  async showTip(message: string, duration: number) {
    const toast = await this.toastCtrl.create(
        {message: message, duration: duration, position: 'top'});
    toast.present();
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }
}
