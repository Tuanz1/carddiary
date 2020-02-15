import {Injectable} from '@angular/core';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Parse} from 'parse';
@Injectable({providedIn: 'root'})
export class SettingService {
  status: string;
  rotate: string;
  darkTheme: string;
  version: string = '1.1.5';
  constructor(
      private statusBar: StatusBar,
  ) {}
  loadStorage() {
    this.status = localStorage.getItem('status');
    this.darkTheme = (localStorage.getItem('darkTheme'));
  }
  initSettings() {
    this.loadStorage();
    if (this.status == 'true')
      this.statusBar.show();
    else
      this.statusBar.hide();
  }
  displayStatusBar(show: boolean) {
    if (show) {
      this.statusBar.show();
    } else {
      this.statusBar.hide();
    }
    this.status = show + '';
    localStorage.setItem('status', show + '');
  }

  checkUpdate(): Promise<any> {
    return Parse.Config.get();
  }
}
