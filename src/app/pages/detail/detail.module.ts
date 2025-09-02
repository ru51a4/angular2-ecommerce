import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { DetailRoutingModule } from './detail-routing.module';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ItemCardComponent } from 'src/app/components/item-card/item-card.component';
import { SharedModule } from 'src/app/shared.module';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';


@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    DetailRoutingModule,
    FormsModule,
    SharedModule,
    NgxGalleryModule
  ]
})
export class DetailModule {
}
