import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessComponent, } from './success.component';
import { SuccessRoutingModule } from './success-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  declarations: [SuccessComponent],
  imports: [
    CommonModule,
    SuccessRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class SuccessModule {
}
