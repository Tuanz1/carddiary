import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'dayCss', pure: false})
export class DayCssPipe implements PipeTransform {
  /**
   * 生成CalendarCard对应日期的css样式
   * @param value month属性
   * @param index 第几日的css
   */
  transform(value: any, index: number): object {
    let date = new Date();
    let css = {'color': '#000000', 'opacity': '1', 'border-bottom': ''};
    let write = value.get('write')[index];
    if (!write) css['opacity'] = '0.3';
    let i = index % 7;
    switch (i) {
      case 0:
        css['color'] = '#70c9f5';
        break;
      case 6:
        css['color'] = '#e54b8b';
        break;
    }
    if (value.get('year') == date.getFullYear() &&
        value.get('month') == date.getMonth() + 1 &&
        value.get('days')[index] == date.getDate())
      css['border-bottom'] = 'solid 2px black';
    return css;
  }
}
