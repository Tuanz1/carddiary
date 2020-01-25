import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DiaryService} from 'src/app/service/diary/diary.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  abbs: Array<string> = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  year: number;
  month: number;
  diarys: Array<any>;
  constructor(
      private diaryService: DiaryService, private router: Router,
      private activedRouter: ActivatedRoute) {}
  ngOnInit() {
    this.diarys = this.diaryService.diarys;
    this.activedRouter.queryParams.subscribe(params => {
      this.year = Number(params.year);
      this.month = Number(params.month);
    });
  }
  getDate(day: number) {
    return this.abbs[new Date(this.year, this.month, day).getDay()];
  }
  openDiaryPreview(index: number) {
    this.router.navigate(
        ['/diary/preview'],
        {queryParams: {year: this.year, month: this.month, day: index}});
  }
  randomColor(): object {
    let colors = ['#70c9f5', '#e54b8b', 'black'];
    let i = Math.floor(Math.random() * 3);
    return {color: colors[i]};
  }
}