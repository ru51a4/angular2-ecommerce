
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { BuyModalComponent } from './components/buy-modal/buy-modal.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';


@NgModule({
    declarations: [ItemCardComponent, BuyModalComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
        ReactiveFormsModule,
        NgxMaskDirective
    ],
    providers: [
        provideNgxMask(),
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
    ],
    exports: [ItemCardComponent]
})
export class SharedModule {
}
