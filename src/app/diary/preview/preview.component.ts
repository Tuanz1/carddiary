import {AfterContentChecked, AfterContentInit, AfterViewChecked, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ActionSheetController, IonSlides, NavController} from '@ionic/angular';
import {Month} from 'src/app/service/calendar/month';
import {DiaryService} from 'src/app/service/diary/diary.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit, AfterContentInit {
  @ViewChild('slides', {static: true}) slides: IonSlides;
  index: number;
  diarys: Array<any>;
  year: string;
  month: string;
  day: string;
  weather: string = '';
  emoji: string = '';
  favorite: boolean;
  options = {
    autoplay: {
      delay: 3500,
    },
  };
  constructor(
      private diaryService: DiaryService, private router: Router,
      private navCtrl: NavController, private activatedRoute: ActivatedRoute,
      private actionSheetCtrl: ActionSheetController) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.diarys = this.diaryService.diarys;
      this.index = Number(params.index);
      this.favorite = this.diarys[this.index].get('favorite');
      let labels = this.diarys[this.index].get('labels');
      for (let i = 0; i < labels.length; i++) {
        if (labels[i].get('type') == 'weather')
          this.weather = labels[i].get('name');
        else if (labels[i].get('type') == 'emoji')
          this.emoji = labels[i].get('name');
      }
    });
  }
  ngAfterContentInit() {
    this.slides.slideTo(this.index);
    console.log(this.index + 'index');
  }
  async openEdit() {
    let index = await this.slides.getActiveIndex();
    this.diaryService.diary = this.diarys[index];
    this.router.navigate(['/diary'], {
      queryParams: {
        edit: 'true',
        date:
            new Date(
                this.diarys[index].get('year'), this.diarys[index].get('month'),
                this.diarys[index].get('day'))
                .toString()
      }
    });
  }
  async openActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '操作',
      buttons: [
        {
          text: '编辑',
          icon: 'create',
          handler: () => {
            this.openEdit();
          }
        },
        {
          text: '删除',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.deleteDiary();
          }
        },
        {
          text: '取消',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            this.actionSheetCtrl.dismiss();
          }
        }
      ]
    });
    await actionSheet.present();
  }
  async deleteDiary() {
    let index = await this.slides.getActiveIndex();
    this.diaryService.deleteDiary(this.diarys[index]);
    this.diarys.splice(index, 1);
  }
  close() {
    this.navCtrl.navigateRoot('/tabs/tab1');
  }
  async ionSlideChange(event) {
    let index = await this.slides.getActiveIndex();
    this.favorite = Boolean(this.diarys[index].get('favorite'));
    let labels = this.diarys[index].get('labels');
    for (let i = 0; i < labels.length; i++) {
      if (labels[i].get('type') == 'weather')
        this.weather = labels[i].get('name');
      if (labels[i].get('type') == 'emoji') this.emoji = labels[i].get('name');
    }
  }
  getMonthAbb(index: number): string {
    return Month.abbs[index];
  }
}