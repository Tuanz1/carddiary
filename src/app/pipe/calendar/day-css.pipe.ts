import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'dayCss', pure: false})
export class DayCssPipe implements PipeTransform {
  /**
   * 生成CalendarCard对应日期的css样式
   * @param value month属性
   * @param index 第几日的css
   */
  transform(value: any, index: number): object {
    let css = {'color': '#000000', 'opacity': '1', 'border-bottom': ''};
    let write = value.get('write')[index];
    if (!write) css['opacity'] = '0.3';
    let i = index % 7;
    switch (i) {
      case 0:
        css['color'] = 'blue';
        break;
      case 6:
        css['color'] = 'red';
        break;
    }
    return css;
  }
}
