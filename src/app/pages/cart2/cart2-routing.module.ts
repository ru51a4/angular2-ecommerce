import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { Cart2Component } from './cart2.component';

const routes: Routes = [
  {
    path: '',
    component: Cart2Component,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class Cart2RoutingModule {
}
