import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'diary',
    loadChildren: () =>
        import('./diary/diary.module').then(m => m.DiaryPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'setting',
    loadChildren: () =>
        import('./setting/setting.module').then(m => m.SettingPageModule)
  },
  {
    path: 'search',
    loadChildren: () =>
        import('./search/search.module').then(m => m.SearchPageModule)
  },
  {
    path: 'gallery',
    loadChildren: () =>
        import('./gallery/gallery.module').then(m => m.GalleryPageModule)
  },
];
@NgModule({
  imports:
      [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
