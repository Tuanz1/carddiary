import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {MarkdownModule} from 'ngx-markdown';

import {PipeModule} from '../pipe/pipe.module';
import {ShareModule} from '../share/share.module';
import {TagEditComponent} from '../share/tag-edit/tag-edit.component';

import {DiaryPageRoutingModule} from './diary-routing.module';
import {DiaryPage} from './diary.page';
import {ImgManagerComponent} from './img-manager/img-manager.component';
import {ListComponent} from './list/list.component';
import {PreviewComponent} from './preview/preview.component';
import {TagManagerComponent} from './tag-manager/tag-manager.component';
import {TagPickerComponent} from './tag-picker/tag-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareModule,
    PipeModule,
    DiaryPageRoutingModule,
    MarkdownModule.forChild(),
  ],
  declarations: [
    DiaryPage,
    ImgManagerComponent,
    TagPickerComponent,
    TagManagerComponent,
    ListComponent,
    PreviewComponent,
  ],
  entryComponents: [
    ImgManagerComponent,
    TagPickerComponent,
    TagManagerComponent,
  ]
})
export class DiaryPageModule {
}
