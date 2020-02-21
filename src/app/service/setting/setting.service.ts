import {Injectable} from '@angular/core';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Parse} from 'parse';
@Injectable({providedIn: 'root'})
export class SettingService {
  status: string;
  rotate: string;
  mode: string;
  version: string = '1.1.6';
  constructor(
      private statusBar: StatusBar,
  ) {}

  loadStorage() {
    this.status = localStorage.getItem('status');
    this.mode = localStorage.getItem('mode');
  }

  initSettings() {
    this.loadStorage();
    if (this.status == 'true')
      this.statusBar.show();
    else
      this.statusBar.hide();
    this.setMode(this.mode);
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
  setMode(mode: string) {
    localStorage.setItem('mode', mode);
    switch (mode) {
      case 'day':
        document.body.classList.toggle('dark', false);
        break;
      case 'night':
        document.body.classList.toggle('dark', true);
        break;
      case 'auto':
        let hour = new Date().getHours();
        if (hour < 20 && hour > 7)
          document.body.classList.toggle('dark', false);
        else
          document.body.classList.toggle('dark', true);
        break;
    }
  }

  checkUpdate(): Promise<any> {
    return Parse.Config.get();
  }
}
