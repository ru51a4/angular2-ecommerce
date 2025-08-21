import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { Observable, Subject, filter, map, takeUntil } from 'rxjs';
import { BuyModalComponent } from '../buy-modal/buy-modal.component';
import { GlobalService } from 'src/app/global.service';
@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent {
  constructor(public dialog: MatDialog, private router: Router, public service: GlobalService) {

  }
  public destroy$ = new Subject();
  buyModal() {
    let modal = this.dialog.open(BuyModalComponent, {
      data: {},
      hasBackdrop: true,
      backdropClass: '_',
      closeOnNavigation: true
    });
    this.service.modals.pipe(filter((t) => !!t)).subscribe(() => {
      modal.close()
      this.service.modals.next(false);
    })

  }
  detail() {
    this.router.navigate(['/detail']);
  }

}
