import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { UrlSegment, UrlMatchResult } from '@angular/router';

// Функция-матчер для обработки массива ID
export function arrayIdMatcher(url: UrlSegment[]): UrlMatchResult | null {
  // Проверяем, что первый сегмент - 'catalog', а остальные - числовые ID
  if (url.length >= 1 && url[0].path === 'catalog') {
    const idSegments = url.slice(1);

    // Проверяем, что все остальные сегменты - числа
    if (idSegments.every(segment => segment.path)) {
      return {
        consumed: url,
        posParams: {
          ids: new UrlSegment(idSegments.map(s => s.path).join(','), {}) // Передаем как строку с разделителями
        }
      };
    }
  }
  return null;
}
export function arrayIdMatcherDetail(url: UrlSegment[]): UrlMatchResult | null {
  // Проверяем, что первый сегмент - 'catalog', а остальные - числовые ID
  if (url.length >= 1 && url[0].path === 'detail') {
    const idSegments = url.slice(1);

    // Проверяем, что все остальные сегменты - числа
    if (idSegments.every(segment => segment.path)) {
      return {
        consumed: url,
        posParams: {
          ids: new UrlSegment(idSegments.map(s => s.path).join(','), {}) // Передаем как строку с разделителями
        }
      };
    }
  }
  return null;
}



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
      matcher: arrayIdMatcher,
      loadChildren: () => import('./pages/catalog/catalog.module').then(m => m.CatalogModule),
      canActivate: []
    },
    {
      matcher: arrayIdMatcherDetail,
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
