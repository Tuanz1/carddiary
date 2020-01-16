import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UserRoutingModule} from './user-routing.module';



@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UserRoutingModule,
  ]
})
export class UserModule {
}
