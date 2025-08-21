import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart2Component, } from './cart2.component';
import { Cart2RoutingModule } from './cart2-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  declarations: [Cart2Component],
  imports: [
    CommonModule,
    Cart2RoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class Cart2Module {
}
