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
  public init = false;
  constructor(private router: Router, public service: GlobalService) {
    this.fetch();
    this.service.cart.subscribe(() => {
      this.fetch();
    })
  }
  public count: any = {};
  public miuns(id: any) {
    this.count[id]--;
    this.service.deleteToCardOne(id)
  }
  public plus(id: any) {
    this.count[id]++;
    this.service.addToCard(id);
  }

  fetch() {
    this.count = {};
    let arr = this.service.cart.getValue()
    if (!arr.length) {
      this.arr = [];
    }
    for (let i = 0; i <= arr.length - 1; i++) {
      if (!this.count[arr[i]]) {
        this.count[arr[i]] = 0;
      }
      this.count[arr[i]]++;
    }
    arr = Object.keys(this.count).map(Number);
    forkJoin(arr.map((id: any) => this.service.getProduct(id))).subscribe((d: any) => {
      this.arr = d.sort((a: any, b: any) => a.id - b.id)
      console.log({ dd: this.arr })
      this.init = true
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
