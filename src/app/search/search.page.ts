import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

import {DiaryService} from '../service/diary/diary.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  history: Array<string> = new Array();
  constructor(
      private diaryService: DiaryService, private toastCtrl: ToastController,
      private router: Router) {}
  searchForm: FormGroup;
  ngOnInit() {
    let history = localStorage.getItem('history');
    if (history != null) this.history = JSON.parse(history);
    this.searchForm = new FormGroup({
      keywords: new FormControl(''),
    });
  }
  async search() {
    let keywords = this.searchForm.get('keywords').value;

    await this.diaryService.queryDiarysByKeywords(keywords);
    if (this.diaryService.diarys.length == 0) {
      const toast = await this.toastCtrl.create({
        message: '没有查到与关键词有关的日记',
        duration: 2000,
        position: 'middle'
      });
      toast.present();
    } else {
      this.history.push(keywords);
      localStorage.setItem('history', JSON.stringify(this.history));
      this.router.navigate(['/diary/list']);
    }
  }
  async searchByHistory(keywords: string) {
    await this.diaryService.queryDiarysByKeywords(keywords);
    this.router.navigate(['/diary/list']);
  }
}
