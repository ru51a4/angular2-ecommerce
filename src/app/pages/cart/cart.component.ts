import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { BuyModalComponent } from 'src/app/components/buy-modal/buy-modal.component';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {

  public arr: any = [];
  constructor(private router: Router, public service: GlobalService) {
    this.fetch();
    this.service.cart.subscribe(() => {
      this.fetch();
    })
  }
  fetch() {
    let arr = this.service.cart.getValue()
    if (!arr.length) {
      this.arr = [];
    }
    forkJoin(arr.map((id: any) => this.service.getProduct(id))).subscribe((d: any) => {
      this.arr = d
      console.log({ d })
    })
  }
  del(i: any) {
    this.service.deleteToCard(i)
  }
  getPic(i: any) {
    return `https://iblockcms.mooo.com/${this.arr[i].prop['DETAIL_PICTURE']}`
  }
  public checkbox = false;

  cart2() {
    console.log(111)
    this.router.navigate(['/cart2'])
  }
}
