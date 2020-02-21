import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {ModalController, ToastController} from '@ionic/angular';
import {Parse} from 'parse';

import {SettingService} from '../service/setting/setting.service';

import {AboutMeComponent} from './about-me/about-me.component';
import {AccountComponent} from './account/account.component';
import {DonateComponent} from './donate/donate.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  status: boolean;
  mode: string = 'day';
  constructor(
      private toastCtrl: ToastController, private router: Router,
      private settingService: SettingService,
      private modalCtrl: ModalController) {}

  ngOnInit() {
    this.status = this.settingService.status == 'true' ? true : false;
    this.mode = this.settingService.mode;
  }
  switchStatusBar(event) {
    this.settingService.displayStatusBar(this.status);
  }
  switchTheme(event) {
    this.settingService.setMode(event.target.value);
  }
  logOut() {
    localStorage.setItem('login', 'false');
    Parse.User.logOut().then(data => {});
    this.router.navigate(['/user/login']);
  }
  async openAboutMe() {
    const modal = await this.modalCtrl.create({
      component: AboutMeComponent,
      componentProps: {version: this.settingService.version},
    });
    await modal.present();
  }
  async openDonate() {
    const modal = await this.modalCtrl.create({component: DonateComponent});
    await modal.present();
  }
  async openAccount() {
    const modal = await this.modalCtrl.create({component: AccountComponent});
    await modal.present();
  }
  async checkUpdate() {
    this.settingService.checkUpdate().then(async config => {
      let version = config.get('version');
      let message: string;
      if (version == this.settingService.version)
        message = '已经是最新版本';
      else
        message = '请下载最新版' + version;
      const toast = await this.toastCtrl.create(
          {message: message, duration: 2000, position: 'top'});
      toast.present();
    });
  }
}
