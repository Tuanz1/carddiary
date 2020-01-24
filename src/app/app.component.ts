import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
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
      private screenOrientation: ScreenOrientation,
  ) {
    this.initializeApp();
    this.initialzeParse();

    if (Parse.User.current()) {
      console.log(Parse.User.current());
      this.router.navigate(['/tabs/tab1']);
    } else {
      this.router.navigate(['/user']);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.hide();
      // this.statusBar.overlaysWebView(true);
      // this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    });
  }
  initialzeParse() {
    Parse.initialize(
        'GGmbVq9sjSw9uODaf1fHsqMn2AL8tooE0OkLJGRz',
        'GGmbVq9sjSw9uODaf1fHsqMn2AL8tooE0OkLJGRz');
    Parse.serverURL = 'https://shellcode.vip:1337/parse';
  }
}
