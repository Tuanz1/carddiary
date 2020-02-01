import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(private routes: Router) {}
  navToDiary() {
    this.routes.navigate(
        ['./diary'], {queryParams: {edit: false, date: 'none'}});
  }
  navToTab3() {
    this.routes.navigate(['/tabs/tab3'], {queryParams: {refresh: 'true'}});
  }
  navToTab1() {
    this.routes.navigate(['/tabs/tab1']);
  }
}
