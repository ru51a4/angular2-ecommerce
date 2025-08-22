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
      path: 'catalog/:id',
      loadChildren: () => import('./pages/catalog/catalog.module').then(m => m.CatalogModule),
      canActivate: []
    },
    {
      path: 'detail/:id',
      loadChildren: () => import('./pages/detail/detail.module').then(m => m.DetailModule),
      canActivate: []
    },
    {
      path: 'cart',
      loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule),
      canActivate: []
    },
    {
      path: 'cart2',
      loadChildren: () => import('./pages/cart2/cart2.module').then(m => m.Cart2Module),
      canActivate: []
    },
    {
      path: 'success',
      loadChildren: () => import('./pages/success/success.module').then(m => m.SuccessModule),
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
