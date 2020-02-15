import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController, ToastController} from '@ionic/angular';
import {CalendarService} from 'src/app/service/calendar/calendar.service';
import {DiaryinfoService} from 'src/app/service/diaryinfo/diaryinfo.service';
import {LabelService} from 'src/app/service/label/label.service';
import {UserService} from 'src/app/service/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  custom: boolean = false;
  constructor(
      private labelService: LabelService, private userService: UserService,
      private diaryinfoService: DiaryinfoService,
      private toastCtrl: ToastController, private navCtrl: NavController) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username:
          new FormControl('', [Validators.required, Validators.minLength(4)]),
      password:
          new FormControl('', [Validators.required, Validators.minLength(4)]),
      domain: new FormControl('', []),
      appId: new FormControl(null, []),
      jsKey: new FormControl(null, [])
    });
  }
  customServer() {
    this.custom = !this.custom;
  }
  register() {
    if (this.custom)
      this.userService.initialzeParse(
          this.loginForm.get('domain').value, this.loginForm.get('appId').value,
          this.loginForm.get('jsKey').value);
    else
      this.userService.initialzeParse(
          'https://shellcode.vip:1337/parse',
          'GGmbVq9sjSw9uODaf1fHsqMn2AL8tooE0OkLJGRz',
          'GGmbVq9sjSw9uODaf1fHsqMn2AL8tooE0OkLJGRz');
    this.userService
        .register(
            this.loginForm.get('username').value,
            this.loginForm.get('password').value)
        .then(data => {
          this.diaryinfoService.createDiaryInfo();
          this.labelService.genDefaultLabels();
          localStorage.setItem('login', 'true');
          this.navCtrl.navigateRoot(
              '/tabs/tab1', {queryParams: {refresh: 'true'}});
        })
        .catch(async err => {
          const toast = await this.toastCtrl.create({
            message: err,
            duration: 2500,
            position: 'middle',
            color: 'danger'
          });
          toast.present();
        });
  }
}
