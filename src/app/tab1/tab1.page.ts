import {animate, state, style, transition, trigger,} from '@angular/animations';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, IonDatetime, IonSlides, ModalController, NavController} from '@ionic/angular';

import {CalendarService} from '../service/calendar/calendar.service';
import {DiaryService} from '../service/diary/diary.service';
import {ErrorService} from '../service/error/error.service';

import {ColorPickerComponent} from './color-picker/color-picker.component';


@Component({
  selector: 'app-tab1',
  animations: [trigger(
      'viewMode',
      [
        state('card', style({transform: 'rotateY(0)'})),
        state('calendar', style({transform: 'rotateY(0)'})),
        transition(
            'calendar => card',
            [style({transform: 'rotateY(90deg)'}), animate('0.5s ease')]),
        transition(
            'card =>  calendar',
            [style({transform: 'rotateY(90deg)'}), animate('0.5s ease')]),
      ])],
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild(IonSlides, {static: true}) ionSlides: IonSlides;
  @ViewChild(IonDatetime, {static: true}) ionDatetime: IonDatetime;
  viewMode: string = 'card';
  loading: boolean = false;
  curDate: Date;
  calendars: Array<any>;
  year: number;
  date: string;
  slideOpts: object;
  grid: Array<Array<number>> = [
    [0, 1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20], [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30, 31, 32, 33, 34]
  ];
  constructor(
      private errorService: ErrorService,
      private calendarService: CalendarService,
      private diaryService: DiaryService, private router: Router,
      private alertCtrl: AlertController, private modalCtrl: ModalController,
      private navCtrl: NavController, private activatedRoute: ActivatedRoute) {
    this.curDate = new Date();
    this.year = this.curDate.getFullYear();
    this.date = this.curDate.toString();
    this.slideOpts = {
      initialSlide: this.curDate.getMonth(),
      speed: 300,
      spaceBetween: 10,
      slidesPerView: 'auto',
      centeredSlides: true,
    };
  }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.refresh == 'true') {
        this.changeYearCalendarByYear(this.year);
      }
    });
  }
  async openDatetime() {
    await this.ionDatetime.open();
  }

  changeYearCalendar() {
    this.year = new Date(this.date).getFullYear();
    this.changeYearCalendarByYear(this.year);
  }
  changeYearCalendarByYear(year: number) {
    this.calendarService.queryCalendar(year)
        .then(data => {
          this.calendarService.calendars = data;
          if (data.length == 0) {
            // 相当于new Array()
            this.calendarService.genDefaultCalendar(year);
          }
          this.calendars = this.calendarService.calendars;
        })
        .catch((err) => {
          this.errorService.displayErrorAlert(err);
        });
  }

  /**
   * 打开月份卡片背景设置modal
   * @param index 第几月
   */
  async openColorPicker(index: number) {
    const modal = await this.modalCtrl.create({
      component: ColorPickerComponent,
      componentProps: {'color': this.calendars[index].get('background')},
      cssClass: 'color-picker-modal',
    });
    await modal.present();
    const {data} = await modal.onWillDismiss();
    // backdrop回退不会有result数据，所以要判断undefined
    if (data != undefined) {
      this.loading = true;
      if (data['type'] == 'color') {
        this.calendarService.updateCalendarBackgroud(index, data.data);
      } else {
        await this.calendarService.updateCalendarImg(index, data.data);
      }
      this.loading = false;
    }
  }
  /**
   * 切换显示模式
   */
  switchViewMode() {
    if (this.viewMode == 'card') {
      this.viewMode = 'calendar';
    } else {
      this.viewMode = 'card';
    }
  }
  // 跳转到当前日期
  switchToCurDate() {
    let year = this.curDate.getFullYear();
    if (year != this.year) {
      this.changeYearCalendarByYear(year);
      this.date = this.year + '';
    }
    this.ionSlides.slideTo(this.curDate.getMonth(), 250);
  }
  async openDiaryList(index: number) {
    this.loading = true;
    if (this.calendars[index].get('count') == 0)
      this.router.navigate(
          ['./diary'], {queryParams: {edit: false, date: 'none'}});
    else {
      await this.diaryService.queryDiarys(
          new Date(this.date).getFullYear(), index);
      this.router.navigate(['./diary/list']);
    }
    this.loading = false;
  }

  async openDiaryPreview(index: number, month: number) {
    if (this.calendars[month].get('write')[index]) {
      this.loading = true;
      await this.diaryService.queryDiarys(
          new Date(this.date).getFullYear(), month);
      this.loading = false;
      let write = this.calendars[month].get('write');
      let count = 0;
      for (let i = 0; i < index; i++) {
        if (write[i]) count++;
      }
      this.router.navigate(['/diary/preview'], {queryParams: {index: count}});
    } else {
      index = this.calendars[month].get('days')[index];
      this.router.navigate(['/diary'], {
        queryParams: {
          edit: false,
          date: new Date(new Date(this.date).getFullYear(), month, index)
                    .toString()
        }
      });
    }
  }
  getBackground(index: number): object {
    let calendar = this.calendars[index];
    let background = calendar.get('background');
    if (background == '') {
      background = calendar.get('cover').get('photo').url();
      background = 'url("' + background + '") no-repeat center/100% 100%';
      return {'background': background};
    } else {
      return {'background': background};
    }
  }
}