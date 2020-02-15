import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  select: number = 0;
  tab1: string = 'albums';
  tab3: string = 'person-outline';
  constructor(private routes: Router) {}
  navToDiary() {
    this.routes.navigate(
        ['./diary'], {queryParams: {edit: false, date: 'none'}});
  }
  selectTab(index: number) {
    if (index == 1) {
      this.tab1 = 'albums';
      this.tab3 = 'person-outline';
    } else {
      this.tab1 = 'albums-outline';
      this.tab3 = 'person';
    }
  }
}
