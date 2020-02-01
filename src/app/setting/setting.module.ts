import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {AboutMeComponent} from './about-me/about-me.component';
import {SettingPageRoutingModule} from './setting-routing.module';
import {SettingPage} from './setting.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SettingPageRoutingModule],
  entryComponents: [AboutMeComponent],
  declarations: [SettingPage, AboutMeComponent]
})
export class SettingPageModule {
}
