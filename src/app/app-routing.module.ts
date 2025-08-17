import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';


const routes: Routes = [{
  path: '',
  component: ContentLayoutComponent,
  children: [
    {
      path: 'dashboard/:page',
      loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
      canActivate: [],
    },
    {
      path: 'catalog',
      loadChildren: () => import('./pages/catalog/catalog.module').then(m => m.CatalogModule),
      canActivate: []
    },
    {
      path: 'detail',
      loadChildren: () => import('./pages/detail/detail.module').then(m => m.DetailModule),
      canActivate: []
    },
    {
      path: '**',
      loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
      canActivate: []
    },]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
