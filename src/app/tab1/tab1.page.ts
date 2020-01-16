import {animate, state, style, transition, trigger,} from '@angular/animations';
import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {IonSlides, ModalController, ToastController} from '@ionic/angular';

// import {CalendarService} from '../service/calendar/calendar.service';
// import {DiaryService} from '../service/diary/diary.service';
// import {LabelService} from '../service/label/label.service';

// import {ColorPickerComponent} from './color-picker/color-picker.component';

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
export class Tab1Page {
  constructor() {}
  // @ViewChild(IonSlides, {static: true}) ionSlides: IonSlides;
  // viewMode: String = 'card';
  // btnTips: String = 'Calendar';
  // btnFill: String = 'outline';
  // date: string;
  // year: number;
  // month: number;
  // day: number;
  // calendars: Array<any>;
  // /**
  //  * 用来保证日历布局的数组
  //  */
  // grid: Array < Array < number >>= new Array<Array<number>>();
  // /**
  //  * 月份的缩写
  //  */
  // slideOpts: any;
  // constructor(
  //     private router: Router, private modalCtrl: ModalController,
  //     private toastCtrl: ToastController,
  //     private calendarService: CalendarService,
  //     private diaryService: DiaryService, private labelService:
  //     LabelService) {
  //   let curDate = new Date();
  //   this.grid.push([0, 1, 2, 3, 4, 5, 6]);
  //   this.grid.push([7, 8, 9, 10, 11, 12, 13]);
  //   this.grid.push([14, 15, 16, 17, 18, 19, 20]);
  //   this.grid.push([21, 22, 23, 24, 25, 26, 27]);
  //   this.grid.push([28, 29, 30, 31, 32, 33, 34]);
  //   this.year = curDate.getFullYear();
  //   this.date = this.year + '';
  //   this.month = curDate.getMonth();
  //   this.day = curDate.getDate();
  //   this.slideOpts = {
  //     initialSlide: this.month,
  //     speed: 300,
  //     spaceBetween: 0,
  //     slidesPerView: 'auto',
  //     centeredSlides: true,
  //   };
  //   console.log('current year' + this.year);
  //   this.changeYearCalendarByYear(this.year);
  // }
  // /**
  // * 初始化获取今年的日历卡片 * /
  // async ngOnInit() {}

  // async changeYearCalendarByYear(year: number) {
  //   await this.calendarService.queryCalendar(year);
  //   await this.diaryService.queryDiarys();
  //   let test = JSON.stringify(this.diaryService.diarys[0]);
  //   console.log(test);

  //   console.log(this.diaryService.diarys[0].toJSON());

  //   // console.log(Parse.Object.fromJSON('Diary', JSON.parse(test), true));
  //   await this.labelService.queryLabel();
  //   this.calendars = this.calendarService.calendars.sort(
  //       (a, b) => a.get('num') - b.get('num'));
  //   // console.log(this.calendars);
  // }
  // changeYearCalendar() {
  //   let year = new Date(this.date).getFullYear();
  //   this.changeYearCalendarByYear(year);
  // }
  // /**
  //  * 打开月份卡片背景设置modal
  //  * @param index 第几月
  //  */
  // async openColorPicker(index: number) {
  //   const modal = await this.modalCtrl.create({
  //     component: ColorPickerComponent,
  //     componentProps: {'select': this.calendars[index].get('background')},
  //     cssClass: 'color-picker-modal'
  //   });
  //   await modal.present();
  //   const {data} = await modal.onWillDismiss();
  //   // backdrop回退不会有result数据，所以要判断undefined
  //   if (data != undefined) {
  //     if (data['type'] == 'color') {
  //       this.calendarService.updateCalendarBackground(index, data.data);
  //     } else if (data['type'] == 'image') {
  //       if (data.data.size / 1024 / 1024 > 2) {
  //         const toast = await this.toastCtrl.create({
  //           message: '图片大小尽可能小于2M.',
  //           position: 'top',
  //           duration: 3000
  //         });
  //         toast.present();
  //       } else {
  //         this.calendarService.updateCalendarImg(index, data.data);
  //       }
  //     }
  //   }
  // }
  // /**
  //  * 打开日记列表
  //  */
  // async openListPage(month: number) {
  //   await this.diaryService.queryDiarys();
  //   let diarys = [
  //     {date: new Date(), weather: 'rain', img: '../../assets/test/1.jpg'},
  //     {date: new Date(), weather: 'rain', img: '../../assets/test/2.jpg'},
  //     {date: new Date(), weather: 'rain', img: '../../assets/test/3.jpg'}
  //   ];
  //   this.router.navigate(
  //       ['/diary-list'], {queryParams: {year: this.year, month: month}});
  // }
  // /**
  //  * 切换显示模式
  //  */
  // switchViewMode() {
  //   if (this.viewMode == 'card') {
  //     this.viewMode = 'calendar';
  //     this.btnTips = 'Back';
  //     this.btnFill = 'solid';
  //   } else {
  //     this.btnTips = 'Calendar';
  //     this.viewMode = 'card';
  //     this.btnFill = 'outline';
  //   }
  // }

  // /**
  //  * 两种卡片模式相互切换
  //  */
  // display(mode: string): object {
  //   if (mode == this.viewMode)
  //     return {'display': 'block'};
  //   else
  //     return {
  //       'display': 'none'
  //     }
  // }
  // test() {
  //   // this.calendarService.generatorCalendar(new Date().getFullYear());
  // }
  // async currentDate() {
  //   let year = new Date(this.date).getFullYear();
  //   if (year != this.year) {
  //     await this.changeYearCalendarByYear(year);
  //     this.date = this.year + '';
  //   }
  //   this.ionSlides.slideTo(this.month, 150);
  // }
}
