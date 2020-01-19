import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ActionSheetController, IonSlides} from '@ionic/angular';
import {DiaryService} from 'src/app/service/diary/diary.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  @ViewChild('slides', {static: true}) slides: IonSlides;
  diarys: Array<any>;
  year: string;
  month: string;
  day: string;
  options: object = {

  };
  constructor(
      private diaryService: DiaryService, private router: Router,
      private activatedRoute: ActivatedRoute,
      private actionSheetCtrl: ActionSheetController) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.diarys = this.diaryService.diarys;
      this.year = params.year;
      this.month = params.month;
      this.day = params.day;
      this.slides.slideTo(Number(this.day));
    });
  }
  async openEdit() {
    let index = await this.slides.getActiveIndex();
    this.diaryService.diary = this.diarys[index];
    this.router.navigate(['/diary'], {queryParams: {edit: true}});
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
    this.router.navigate(['/']);
  }
}