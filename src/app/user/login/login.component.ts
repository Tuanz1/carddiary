import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {CalendarService} from 'src/app/service/calendar/calendar.service';
import {LabelService} from 'src/app/service/label/label.service';
import {UserService} from 'src/app/service/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
      private labelService: LabelService,
      private userService: UserService,
      private navCtrl: NavController,
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username:
          new FormControl('', [Validators.required, Validators.minLength(4)]),
      password:
          new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }
  login() {
    this.userService
        .login(
            this.loginForm.get('username').value,
            this.loginForm.get('password').value)
        .then(user => {
          // 用router会导致你的返回回到注册界面
          // this.router.navigate(['/tabs/tab1']);
          this.labelService.queryLabels();
          this.navCtrl.navigateRoot(
              '/tabs/tab1', {queryParams: {refresh: 'true'}});
        })
        .catch((err) => {
          alert(err);
        });
  }
  openRegister() {
    this.navCtrl.navigateForward('/user/register');
  }
}
