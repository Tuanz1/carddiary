import {Injectable} from '@angular/core';
import {Parse} from 'parse';

import {Label} from './label';

@Injectable({providedIn: 'root'})
export class LabelService {
  op: number = 0;
  Label = Parse.Object.extend('Label');
  userLabels: Array<any>;

  constructor() {}
  queryLabels(): Promise<any> {
    let query = new Parse.Query(this.Label);
    query.equalTo('user', Parse.User.current());
    query.descending('type');
    return query.find()
        .then(data => {
          this.userLabels = data;
        })
        .catch(err => {
          console.log(err);
        });
  }
  incrementLabel(label) {
    label.increment('count');
    label.save();
  }
  decrementLabel(label) {
    label.decrement('count');
    label.save();
  }
  updateLabel(index: number, name: string) {
    this.op++;
    this.userLabels[index].set('name', name);
    this.userLabels[index]
        .save()
        .then(data => console.log(data))
        .catch(err => console.log(err));
  }
  deleteLabel(index: number) {
    this.op++;
    this.userLabels[index].destroy();
    this.userLabels.splice(index, 1);
  }

  deleteLabelById(id: string) {
    this.op++;
    for (let i = 0; i < this.userLabels.length; i++) {
      if (this.userLabels[i].id == id) {
        this.userLabels[i].destroy();
        this.userLabels.splice(i, 1);
      }
    }
  }
  getWeatherLabel(name: string) {
    return this.userLabels.filter(
        data => data.get('type') == 'weather' && data.get('name') == name)[0];
  }
  getEmojiLabel(name: string) {
    return this.userLabels.filter(
        data => data.get('type') == 'emoji' && data.get('name') == name)[0];
  }
  getCustomLabels(): Array<Label> {
    let customLabels = new Array<Label>();
    for (let i = 0; i < this.userLabels.length; i++) {
      if (this.userLabels[i].get('type') == 'custom') {
        customLabels.push(new Label(
            i, this.userLabels[i].get('name'),
            this.userLabels[i].get('count')));
      }
    }
    return customLabels;
  }
  createLabel(type: string, name: string): Promise<any> {
    this.op++;
    let lable = new this.Label();
    lable.set('type', type);
    lable.set('name', name);
    lable.set('user', Parse.User.current());
    lable.set('count', 0);
    return lable.save();
  }
  /**
   * 用户注册完成时，生成默认的24个label
   */
  genDefaultLabels() {
    this.userLabels = new Array();
    const emojiLabels: Array < string >= [
      'icon-cool', 'icon-smile', 'icon-kiss', 'icon-blink', 'icon-sleep',
      'icon-unhappy', 'icon-line', 'icon-angry', 'icon-hurt', 'icon-cry',
      'icon-zip', 'icon-shit'
    ];
    const weatherLabels: Array < string >= [
      'icon-duoyun', 'icon-dayu', 'icon-leizhenyu', 'icon-qing',
      'icon-qingzhuanduoyun', 'icon-xiaoyu', 'icon-baoyu', 'icon-bingbao',
      'icon-wanduoyun', 'icon-wu', 'icon-xiaoxue', 'icon-yangsha'
    ];
    for (let i = 0; i < 12; i++) {
      this.createLabel('weather', weatherLabels[i]);
      this.createLabel('emoji', emojiLabels[i]);
    }
  }
  //由用户标签提取用户自定义标签并且转换成用户Label数组
  genDiaryCustomLabels(diaryLabels): Array<Label> {
    let labels = new Array<Label>();
    let flag = false;
    for (let i = 24; i < this.userLabels.length; i++) {
      flag = false;
      for (let j = 0; j < diaryLabels.length; j++) {
        if (this.userLabels[i].id == diaryLabels[j].id) {
          flag = true;
          break;
        }
      }
      labels.push(new Label(
          i, this.userLabels[i].get('name'), this.userLabels[i].get('count'),
          flag));
    }
    return labels;
  }
  covertLabels(weather: string, emoji: string, labels: Array<Label>) {
    let diaryLabels = new Array<any>();
    diaryLabels = new Array<any>();
    diaryLabels.push(this.getWeatherLabel(weather));
    diaryLabels.push(this.getEmojiLabel(emoji));
    for (let i = 0; i < labels.length; i++) {
      if (labels[i].select) diaryLabels.push(this.userLabels[labels[i].index]);
    }
    return diaryLabels;
  }
};
