import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {CalendarService} from 'src/app/service/calendar/calendar.service';
import {LabelService} from 'src/app/service/label/label.service';
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
      private labelService: LabelService, private userService: UserService,
      private calendarService: CalendarService,
      private navCtrl: NavController) {}

  ngOnInit() {}
  register() {
    this.userService.register(this.username, this.password)
        .then(data => {
          this.calendarService.queryCalendar(new Date().getFullYear());
          this.labelService.genDefaultLabels();
          this.navCtrl.navigateRoot(
              '/tabs/tab1', {queryParams: {refresh: 'true'}});
        })
        .catch(err => {
          alert(err);
        });
  }
}
