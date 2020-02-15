import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';

import {PipeModule} from '../pipe/pipe.module';
import {ShareModule} from '../share/share.module';

import {DiaryInfoComponent} from './diary-info/diary-info.component';
import {Tab3Page} from './tab3.page';
import {TagsManagerComponent} from './tags-manager/tags-manager.component';

@NgModule({
  imports: [
    IonicModule, CommonModule, FormsModule, PipeModule, ShareModule,
    RouterModule.forChild([{path: '', component: Tab3Page}])
  ],
  entryComponents: [DiaryInfoComponent, TagsManagerComponent],
  declarations: [Tab3Page, DiaryInfoComponent, TagsManagerComponent]
})
export class Tab3PageModule {
}
