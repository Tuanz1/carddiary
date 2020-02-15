import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'monthAbb'})
export class MonthAbbPipe implements PipeTransform {
  abbs: Array<string> = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov',
    'Dec'
  ];
  transform(value: number): string {
    return this.abbs[value - 1];
  }
}
