import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { DashboardRoutingModule } from './catalog-routing.module';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ItemCardComponent } from 'src/app/components/item-card/item-card.component';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  declarations: [CatalogComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class CatalogModule {
}
