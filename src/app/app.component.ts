import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';
import {SettingService} from './service/setting/setting.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
      private platform: Platform, private router: Router,
      private settingService: SettingService) {
    this.initializeApp();
    this.initialzeParse();

    if (Parse.User.current()) {
      this.router.navigate(['/tabs/tab1']);
    } else {
      this.router.navigate(['/user']);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.settingService.initSettings();
    });
  }
  initialzeParse() {
    Parse.initialize(
        'GGmbVq9sjSw9uODaf1fHsqMn2AL8tooE0OkLJGRz',
        'GGmbVq9sjSw9uODaf1fHsqMn2AL8tooE0OkLJGRz');
    Parse.serverURL = 'https://shellcode.vip:1337/parse';
  }
}
