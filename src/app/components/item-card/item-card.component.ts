import { Component, Input } from '@angular/core';
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
  @Input() data: any;
  detailimage() {
    return `cursor: pointer; background-image: url('https://iblockcms.mooo.com${this.data.prop["DETAIL_PICTURE"]}');`;
  }
  ngOnInit() {
    this.data.props = Object.keys(this.data.prop).filter((key) => !Array.isArray(this.data.prop[key]) && key !== 'DETAIL_PICTURE' && key !== 'photo')?.map((key) => {
      return { key: key, val: this.service.decodeHTMLEntities(this.data.prop[key]) }
    }).filter((c, i) => i < 3);
  }
  buyModal() {
    let id = this.data.id
    this.service.getProduct(id).subscribe((data: any) => {
      let modal = this.dialog.open(BuyModalComponent, {
        data: data,
        hasBackdrop: true,
        backdropClass: '_',
        closeOnNavigation: true
      });
      this.service.modals.pipe(filter((t) => !!t)).subscribe(() => {
        modal.close()
        this.service.modals.next(false);
      })

    });

  }
  detail() {
    let slug = JSON.parse(JSON.stringify(this.service.catalog.getValue().tree[this.data.iblock_id].slug));
    this.router.navigate(['/catalog', ...slug, this.data.slug, 'detail']);
  }

}
