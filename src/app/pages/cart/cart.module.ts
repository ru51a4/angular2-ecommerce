import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent, } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class CartModule {
}
