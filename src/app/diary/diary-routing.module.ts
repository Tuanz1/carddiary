import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DiaryPage} from './diary.page';
import {ListComponent} from './list/list.component';
import {PreviewComponent} from './preview/preview.component';

const routes: Routes = [
  {path: '', component: DiaryPage},
  {path: 'list', component: ListComponent},
  {path: 'preview', component: PreviewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiaryPageRoutingModule {
}
