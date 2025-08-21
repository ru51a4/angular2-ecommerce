import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BuyModalComponent } from 'src/app/components/buy-modal/buy-modal.component';

@Component({
  selector: 'app-cart2',
  templateUrl: './cart2.component.html',
  styleUrls: ['./cart2.component.scss'],
})
export class Cart2Component {
  public curr1 = 1;
  public curr2 = 1;

  toggle1(id: any) {
    this.curr1 = id;
  }

  toggle2(id: any) {
    this.curr2 = id;
  }
}
