import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.scss'],
})
export class TagEditComponent implements OnInit {
  @Input() name: string;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    console.log(this.name);
  }
  cancel() {
    this.modalCtrl.dismiss();
  }
  complete() {
    this.modalCtrl.dismiss(this.name);
  }
}
