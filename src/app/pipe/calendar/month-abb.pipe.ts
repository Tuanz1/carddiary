import {Pipe, PipeTransform} from '@angular/core';
import {Month} from 'src/app/service/calendar/month';

@Pipe({name: 'monthAbb'})
export class MonthAbbPipe implements PipeTransform {
  transform(value: number): string {
    return Month.abbs[value - 1];
  }
}
