import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  constructor() {}
  searchForm: FormGroup;
  ngOnInit() {
    this.searchForm = new FormGroup({
      keywords: new FormControl(''),
    });
  }
  search() {
    alert('search');
  }
}
