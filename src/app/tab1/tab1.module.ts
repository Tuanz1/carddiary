import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';

import {PipeModule} from '../pipe/pipe.module';

import {ColorPickerComponent} from './color-picker/color-picker.component';
import {Tab1Page} from './tab1.page';

@NgModule({
  imports: [
    IonicModule, CommonModule, FormsModule, PipeModule,
    RouterModule.forChild([{path: '', component: Tab1Page}])
  ],
  entryComponents: [ColorPickerComponent],
  declarations: [
    Tab1Page,
    ColorPickerComponent,
  ],
})
export class Tab1PageModule {
}
