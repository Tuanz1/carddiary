import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {UserService} from 'src/app/service/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
      private userService: UserService, private navCtrl: NavController) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username:
          new FormControl('', [Validators.required, Validators.minLength(6)]),
      password:
          new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
  login() {
    this.userService
        .login(
            this.loginForm.get('username').value,
            this.loginForm.get('password').value)
        .then(user => {
          console.log(user);
          // 用router会导致你的返回回到注册界面
          // this.router.navigate(['/tabs/tab1']);
          this.navCtrl.navigateRoot('/');
        })
        .catch((err) => {
          console.log(err);
        });
  }
  openRegister() {
    this.navCtrl.navigateForward('/user/register');
  }
}
