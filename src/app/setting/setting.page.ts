import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {ModalController} from '@ionic/angular';

import {SettingService} from '../service/setting/setting.service';

import {AboutMeComponent} from './about-me/about-me.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  status: boolean;
  rotate: boolean;
  darkTheme: boolean;
  constructor(
      private statusBar: StatusBar,
      private screenOrientation: ScreenOrientation, private router: Router,
      private settingService: SettingService,
      private modalCtrl: ModalController) {}

  ngOnInit() {
    this.status = this.settingService.status == 'true' ? true : false;
    this.rotate = this.settingService.rotate == 'true' ? true : false;
    this.darkTheme = this.settingService.darkTheme == 'true' ? true : false;
  }
  switchStatusBar(event) {
    localStorage.setItem('status', String(this.status));
    if (event.detail.checked) {
      this.statusBar.show();
    } else {
      this.statusBar.hide();
    }
  }
  lockDirection(event) {
    localStorage.setItem('rotate', String(this.rotate));
    if (event.detail.checked)
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    else
      this.screenOrientation.unlock();
  }
  logOut() {
    Parse.User.logOut().then(data => {});
    this.router.navigate(['/user/login']);
  }
  async openAboutMe() {
    const modal = await this.modalCtrl.create({component: AboutMeComponent});
    await modal.present();
  }
}
