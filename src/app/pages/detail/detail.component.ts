import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BuyModalComponent } from 'src/app/components/buy-modal/buy-modal.component';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {

  public allFilter = false;
  public data: any = {}
  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute, public service: GlobalService) {
    const id = this.route.snapshot.params['id'];

    this.service.getProduct(id).subscribe((data: any) => {
      this.data = data;
      this.service.currentDetailTitle.next(data.name)

      this.data.props = Object.keys(this.data.prop).filter((key) => key !== 'DETAIL_PICTURE' && key !== 'photo')?.map((key) => {
        return {
          key: key, curr: true, val: Array.isArray(this.data.prop[key]) ? this.data.prop[key].map((c: any, i: any) => { return { title: c, curr: i == 0 } }) : [{ title: this.service.decodeHTMLEntities(this.data.prop[key]), curr: true }]
        }
      });

    })
  }
  ngOnInit() {
    const id = this.route.snapshot.params['catalogid'];
    this.service.catalog.subscribe((d: any) => {
      const catalogId = this.route.snapshot.params['catalogid'];
      this.service.breadcrump.next(d.tree[Number(catalogId)].path);

    })

    const catalogId = this.route.snapshot.params['catalogid'];
    this.service.breadcrump.next(this.service.catalog.getValue()?.tree?.[Number(catalogId)]?.path);


  }
  pic() {
    return `https://iblockcms.mooo.com/${this.data.prop?.['DETAIL_PICTURE']}`
  }
  pphoto(url: any) {
    return `https://iblockcms.mooo.com/${url}`

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
  toggle(id1: any, id: any) {
    console.log({ dd: this.data.props })
    this.data.props[id1].val = this.data.props[id1].val.map((c: any) => { return { ...c, curr: false } })
    this.data.props[id1].val[id].curr = true;
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


  add() {
    this.service.addToCard(this.data.id)
    this.router.navigate(['/cart'])
  }
  ngOnDesroy() {
    this.service.currentDetailTitle.next(null)
  }
}
