import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';

import {DayCssPipe} from '../pipe/calendar/day-css.pipe';
import {MonthAbbPipe} from '../pipe/calendar/month-abb.pipe';

import {ColorPickerComponent} from './color-picker/color-picker.component';
import {Tab1Page} from './tab1.page';

@NgModule({
  imports: [
    IonicModule, CommonModule, FormsModule,
    RouterModule.forChild([{path: '', component: Tab1Page}])
  ],
  entryComponents: [ColorPickerComponent],
  declarations: [
    Tab1Page,
    MonthAbbPipe,
    ColorPickerComponent,
    DayCssPipe,
  ],
})
export class Tab1PageModule {
}
