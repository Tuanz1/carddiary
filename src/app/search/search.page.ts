import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

import {DiaryService} from '../service/diary/diary.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  history: Array<string> = new Array();
  constructor(private diaryService: DiaryService, private router: Router) {}
  searchForm: FormGroup;
  ngOnInit() {
    let history = localStorage.getItem('history');
    if (history != null) this.history = JSON.parse(history);
    console.log(this.history);

    this.searchForm = new FormGroup({
      keywords: new FormControl(''),
    });
  }
  async search() {
    let keywords = this.searchForm.get('keywords').value;
    this.history.push(keywords);
    localStorage.setItem('history', JSON.stringify(this.history));
    await this.diaryService.queryDiarysByKeywords(keywords);
    this.router.navigate(['/diary/list']);
  }
  async searchByHistory(keywords: string) {
    await this.diaryService.queryDiarysByKeywords(keywords);
    this.router.navigate(['/diary/list']);
  }
}
