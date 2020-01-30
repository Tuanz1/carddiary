import {Injectable} from '@angular/core';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Injectable({providedIn: 'root'})
export class SettingService {
  status: string;
  rotate: string;
  darkTheme: string;
  constructor(
      private screenOrientation: ScreenOrientation,
      private statusBar: StatusBar,
  ) {}
  loadStorage() {
    this.status = localStorage.getItem('status');
    this.rotate = localStorage.getItem('rotate');
    this.darkTheme = (localStorage.getItem('darkTheme'));
  }
  initSettings() {
    this.loadStorage();
    if (this.status == 'true')
      this.statusBar.show();
    else
      this.statusBar.hide();
    if (this.rotate == 'true')
      this.screenOrientation.unlock();
    else
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }
}
