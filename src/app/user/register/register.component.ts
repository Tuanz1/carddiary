import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {UserService} from 'src/app/service/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  constructor(
      private userService: UserService, private navCtrl: NavController) {}

  ngOnInit() {}
  register() {
    this.userService.register(this.username, this.password)
        .then(data => {
          this.navCtrl.navigateRoot('/');
        })
        .catch(err => {
          alert(err);
        })
  }
}
