import {Injectable} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';

@Injectable({providedIn: 'root'})
export class ErrorService {
  constructor(
      private alertCtrl: AlertController, private navCtrl: NavController) {}
  async displayErrorAlert(err) {
    // 严重错误要单独拉出来申请
    let message = this.getErrorMessage(err.code);
    if (err.code == 209) {
      const alert = await this.alertCtrl.create({
        header: '错误!',
        message: '登录信息过期',
        buttons: [{
          text: '返回登录',
          handler: () => {
            this.navCtrl.navigateRoot('/user/login');
          }
        }]
      });
      alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: '错误!',
        message: message,
        buttons: [{
          text: '确定',
          handler: () => {
            this.alertCtrl.dismiss();
          }
        }]
      });
      alert.present();
    }
  }

  getErrorMessage(code): string {
    switch (code) {
      case 101:
        return '用户名或密码不正确';
      case 200:
        return '用户名或密码不能为空';
      case 202:
        return '用户名已存在';
      case 203:
        return '邮箱已经绑定其它账号';
      case 209:
        return '登录信息过期';
      case 122:
        return '文件名不合法，只能包含a-zA-Z0-9_. ';
      case 129:
        return '文件太大';
      case 130:
        return '保存文件出错';
      case 131:
        return '删除文件出错';
      default:
        return '未知错误';
    }
  }
}
