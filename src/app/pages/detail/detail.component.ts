import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { filter } from 'rxjs';
import { BuyModalComponent } from 'src/app/components/buy-modal/buy-modal.component';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnDestroy {

  public allFilter = false;
  public data: any = {}
  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute, public service: GlobalService) {


  }
  fetch(id: any, catalogId: any = null) {
    console.log({ id, catalogId, aa: this.service.slugs.getValue() })
    this.service.getProduct(id).subscribe((data: any) => {
      this.data = data;
      this.service.currentDetailTitle.next(data.name)

      this.data.props = Object.keys(this.data.prop).filter((key) => key !== 'DETAIL_PICTURE' && key !== 'photo')?.map((key) => {
        return {
          key: key, curr: true, val: Array.isArray(this.data.prop[key]) ? this.data.prop[key].map((c: any, i: any) => { return { title: c, curr: i == 0 } }) : [{ title: this.service.decodeHTMLEntities(this.data.prop[key]), curr: true }]
        }
      });
      if (catalogId) {
        this.service.breadcrump.next(this.service.catalog.getValue()?.tree?.[Number(catalogId)]?.path);
      }
    })

  }
  ngOnInit() {
    this.service.globalFetch().subscribe(() => {
      let id = this.route.snapshot.params['id'];
      id = this.service.slugels.getValue()[id];

      this.route.paramMap.subscribe(params => {
        let id: any = params.get('id');
        id = this.service.slugels.getValue()[id];
        let catalogId: any = params.get('catalogid')
        catalogId = this.service.slugs.getValue()[catalogId]
        this.fetch(id, catalogId)
        // Загрузите данные на основе нового ID
      });
      this.fetch(id)

      this.service.catalog.subscribe((d: any) => {
        let catalogId: any = this.route.snapshot.params['catalogid'];
        catalogId = this.service.slugs.getValue()[catalogId];

        this.service.breadcrump.next(d.tree[Number(catalogId)].path);

      })

      let catalogId: any = this.route.snapshot.params['catalogid'];
      catalogId = this.service.slugs.getValue()[catalogId];

      this.service.breadcrump.next(this.service.catalog.getValue()?.tree?.[Number(catalogId)]?.path);

    })


  }
  public galleryOptions = [
    {
      width: '900px',
      height: '600px',
      thumbnailsColumns: 5,
      imageAnimation: NgxGalleryAnimation.Slide,
      lazyLoading: false,
      thumbnailsPercent: 20
    },
    // max-width 800
    {
      breakpoint: 800,
      width: '100%',
      height: '600px',
      imagePercent: 80,
      thumbnailsPercent: 20,
      thumbnailsMargin: 20,
      thumbnailMargin: 20
    },
    // max-width 400
    {
      breakpoint: 400,
      preview: false
    }
  ];


  pic() {
    return `https://iblockcms.mooo.com/${this.data.prop?.['DETAIL_PICTURE']}`
  }
  pphoto() {
    return this.data.prop['photo'].map((c: any) => {
      return {
        small: 'https://iblockcms.mooo.com/' + c,
        medium: 'https://iblockcms.mooo.com/' + c,
        big: 'https://iblockcms.mooo.com/' + c,
      }
    });
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
  ngOnDestroy(): void {
    this.service.currentDetailTitle.next(null)
    this.service.breadcrump.next(null)
  }

}
