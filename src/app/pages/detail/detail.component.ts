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
  public arr = [
    {
      title: 'Базовая', curr: true
    },
    {
      title: 'Версия MAX', curr: false
    },
    {
      title: 'VIP-версия', curr: false
    },
  ]
  toggle(id: any) {
    this.arr = this.arr.map((c) => { return { ...c, curr: false } })
    this.arr[id].curr = true;
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
