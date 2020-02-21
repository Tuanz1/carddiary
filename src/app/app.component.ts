import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Platform} from '@ionic/angular';
import {Parse} from 'parse';

import {SettingService} from './service/setting/setting.service';
import {UserService} from './service/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
      private platform: Platform, private router: Router,
      private settingService: SettingService,
      private userService: UserService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // 锁定竖直
      this.settingService.initSettings();
      this.userService.initialzeParse(
          localStorage.getItem('url'), localStorage.getItem('appId'),
          localStorage.getItem('jsKey'));
      if (localStorage.getItem('login') == 'true' && Parse.User.current()) {
        this.router.navigate(['/tabs/tab1'], {queryParams: {refresh: 'true'}});
      } else {
        this.router.navigate(['/user']);
      }
      // document.body.classList.toggle('dark', true);
    });
  }
}
