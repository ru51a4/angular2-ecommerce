import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { BuyModalComponent } from '../buy-modal/buy-modal.component';
@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent {
  constructor(public dialog: MatDialog, private router: Router) {

  }
  buyModal() {
    console.log('asd')
    this.dialog.open(BuyModalComponent, {
      data: {},
      hasBackdrop: true,
      backdropClass: '_',
      closeOnNavigation: true
    });
  }
  detail() {
    this.router.navigate(['/detail']);

  }
}
