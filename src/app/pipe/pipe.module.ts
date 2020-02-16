import {NgModule} from '@angular/core';

import {OssPipe} from './ali/oss.pipe';
import {DayCssPipe} from './calendar/day-css.pipe';
import {MonthAbbPipe} from './calendar/month-abb.pipe';
import {BackgroundPipe} from './diary/background.pipe';

@NgModule({
  imports: [],
  declarations: [
    MonthAbbPipe,
    DayCssPipe,
    BackgroundPipe,
    OssPipe,
  ],
  exports: [
    MonthAbbPipe,
    DayCssPipe,
    BackgroundPipe,
    OssPipe,
  ]
})
export class PipeModule {
}