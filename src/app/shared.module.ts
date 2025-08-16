
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemCardComponent } from './components/item-card/item-card.component';


@NgModule({
    declarations: [ItemCardComponent],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [ItemCardComponent]
})
export class SharedModule {
}
