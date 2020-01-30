import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {SearchPageRoutingModule} from './search-routing.module';
import {SearchPage} from './search.page';

@NgModule({
  imports: [
    CommonModule, FormsModule, IonicModule, FormsModule, ReactiveFormsModule,
    SearchPageRoutingModule
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {
}
