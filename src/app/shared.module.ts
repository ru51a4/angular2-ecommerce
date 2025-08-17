
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { BuyModalComponent } from './components/buy-modal/buy-modal.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';


@NgModule({
    declarations: [ItemCardComponent, BuyModalComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatDialogModule
    ],
    providers: [
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
    ],
    exports: [ItemCardComponent]
})
export class SharedModule {
}
