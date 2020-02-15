import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {PipeModule} from '../pipe/pipe.module';
import {ShareModule} from '../share/share.module';

import {GalleryPageRoutingModule} from './gallery-routing.module';
import {GalleryPage} from './gallery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    ShareModule,
    GalleryPageRoutingModule,
  ],
  declarations: [
    GalleryPage,
  ]
})
export class GalleryPageModule {
}
