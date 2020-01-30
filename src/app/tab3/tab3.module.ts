import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {Tab3Page} from './tab3.page';
import {UserInfoComponent} from './user-info/user-info.component';

@NgModule({
  imports: [
    IonicModule, CommonModule, FormsModule,
    RouterModule.forChild([{path: '', component: Tab3Page}])
  ],
  entryComponents: [UserInfoComponent],
  declarations: [Tab3Page, UserInfoComponent]
})
export class Tab3PageModule {
}
