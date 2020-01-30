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
      private diaryService: DiaryService,
      private router: Router,
  ) {}
  ngOnInit() {
    this.diarys = this.diaryService.diarys;
  }
  getDate(diary: any) {
    return this
        .abbs[new Date(diary.get('year'), diary.get('month'), diary.get('day'))
                  .getDay()];
  }
  openDiaryPreview(index: number) {
    this.router.navigate(
        ['/diary/preview'],
        {queryParams: {year: this.year, month: this.month, day: index}});
  }
  randomColor(): object {
    let colors = ['#70c9f5', '#f975ac', 'black'];
    let i = Math.floor(Math.random() * 3);
    return {color: colors[i]};
  }
}