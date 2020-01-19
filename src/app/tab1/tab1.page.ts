import {animate, state, style, transition, trigger,} from '@angular/animations';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {IonSlides, ModalController, ToastController} from '@ionic/angular';

import {CalendarService} from '../service/calendar/calendar.service';
import {DiaryService} from '../service/diary/diary.service';
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
  btnTips: String = 'Calendar';
  btnFill: String = 'outline';
  viewMode: string = 'card';

  calendars: Array<any>;
  year: number;
  month: number;
  day: number;
  date: string;
  slideOpts: object;
  grid: Array<Array<number>> = [
    [0, 1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20], [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30, 31, 32, 33, 34]
  ];
  constructor(
      private calendarService: CalendarService,
      private diaryService: DiaryService, private router: Router,
      private modalCtrl: ModalController) {
    let curDate = new Date();
    this.year = curDate.getFullYear();
    this.date = this.year + '';
    this.month = curDate.getMonth();
    this.day = curDate.getDate();
    this.slideOpts = {
      initialSlide: this.month,
      speed: 300,
      spaceBetween: 0,
      slidesPerView: 'auto',
      centeredSlides: true,
    };
  }
  async ngOnInit() {
    await this.changeYearCalendarByYear(this.year);
  }
  test() {
    console.log('test func');
  }
  changeYearCalendar() {
    let year = new Date(this.date).getFullYear();
    this.changeYearCalendarByYear(year);
  }
  async changeYearCalendarByYear(year: number) {
    await this.calendarService.queryCalendar(year);
    this.calendars = this.calendarService.calendars;
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
      if (data['type'] == 'color') {
        this.calendars[index].set('background', data.data);
        this.calendars[index].save();
      } else {
        this.calendarService.updateCalendarImg(index, data.data);
      }
    }
  }
  /**
   * 切换显示模式
   */
  switchViewMode() {
    if (this.viewMode == 'card') {
      this.viewMode = 'calendar';
      this.btnTips = 'Back';
      this.btnFill = 'solid';
    } else {
      this.viewMode = 'card';
      this.btnTips = 'Calendar';
      this.btnFill = 'outline';
    }
  }
  async switchToCurDate() {
    let year = new Date(this.date).getFullYear();
    if (year != this.year) {
      await this.changeYearCalendarByYear(year);
      this.date = this.year + '';
    }
    this.ionSlides.slideTo(this.month, 150);
  }
  async openDiaryList() {
    let index = await this.ionSlides.getActiveIndex();
    await this.diaryService.queryDiarys(this.year, index);
    console.log(this.diaryService.diarys);

    this.router.navigate(
        ['./diary/list'], {queryParams: {year: this.year, month: this.month}});
  }
}