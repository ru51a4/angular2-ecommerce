import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BuyModalComponent } from 'src/app/components/buy-modal/buy-modal.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {

  public allFilter = false;
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

}
