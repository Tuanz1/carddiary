import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {BackgroundPipe} from '../pipe/diary/background.pipe';

import {DiaryPageRoutingModule} from './diary-routing.module';
import {DiaryPage} from './diary.page';
import {ImgManagerComponent} from './img-manager/img-manager.component';
import {ListComponent} from './list/list.component';
import {PreviewComponent} from './preview/preview.component';
import {TagEditComponent} from './tag-edit/tag-edit.component';
import {TagManagerComponent} from './tag-manager/tag-manager.component';
import {TagPickerComponent} from './tag-picker/tag-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiaryPageRoutingModule,
  ],
  declarations: [
    DiaryPage,
    ImgManagerComponent,
    TagPickerComponent,
    TagManagerComponent,
    TagEditComponent,
    ListComponent,
    PreviewComponent,
    BackgroundPipe,
  ],
  entryComponents: [
    ImgManagerComponent,
    TagPickerComponent,
    TagManagerComponent,
    TagEditComponent,
  ]
})
export class DiaryPageModule {
}
