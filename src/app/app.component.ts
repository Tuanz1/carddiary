import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar,
      private router: Router,
  ) {
    this.initializeApp();
    this.initialzeParse();
    this.statusBar.overlaysWebView(false);
    if (Parse.User.current()) {
      console.log(Parse.User.current());
      this.router.navigate(['/tabs/tab1']);
    } else {
      this.router.navigate(['/user']);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  initialzeParse() {
    Parse.initialize(
        'GGmbVq9sjSw9uODaf1fHsqMn2AL8tooE0OkLJGRz',
        'GGmbVq9sjSw9uODaf1fHsqMn2AL8tooE0OkLJGRz',
        'DCKKrJR2Uc0dkLKWuWSXigmDaLXS9BvLH8qntN86');
    Parse.serverURL = 'https://shellcode.vip:1337/parse';
  }
}
