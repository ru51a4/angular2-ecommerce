import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ItemCardComponent } from 'src/app/components/item-card/item-card.component';


@NgModule({
  declarations: [DashboardComponent, ItemCardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
  ]
})
export class DashboardModule {
}
