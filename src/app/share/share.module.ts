import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {PhotoPreviewComponent} from './photo-preview/photo-preview.component';
import {TagEditComponent} from './tag-edit/tag-edit.component';



@NgModule({
  declarations: [PhotoPreviewComponent, TagEditComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  entryComponents: [PhotoPreviewComponent, TagEditComponent],
  exports: [PhotoPreviewComponent, TagEditComponent]
})
export class ShareModule {
}
