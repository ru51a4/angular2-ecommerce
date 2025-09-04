import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { DashboardRoutingModule } from './catalog-routing.module';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ItemCardComponent } from 'src/app/components/item-card/item-card.component';
import { SharedModule } from 'src/app/shared.module';
import { MatSliderModule } from "@angular/material/slider";


@NgModule({
  declarations: [CatalogComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    SharedModule,
    MatSliderModule
  ]
})
export class CatalogModule {
}
