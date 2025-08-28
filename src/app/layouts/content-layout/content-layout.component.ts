import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { BuyModalComponent } from 'src/app/components/buy-modal/buy-modal.component';
import { GlobalService } from 'src/app/global.service';
@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.css']
})
export class ContentLayoutComponent {
  public catalog_popup = false;
  public url = '';
  public d: any = [];
  public dd: any = [];
  public childIds: any = [];
  public raw: any = {};
  constructor(private router: Router, @Inject(DOCUMENT) private document: Document, public service: GlobalService) {
    this.router.events.subscribe(() => {
      this.url = this.router.url;
      this.catalog_popup = false;
      this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
    })
    this.service.childsIds.subscribe((d: any) => {
      this.childIds = d.map(Number);
    })
    this.service.catalog.subscribe((d: any) => {

      this.raw = d;
      this.d = [...Object.values(d.tree)?.filter((c: any) => c.path.length == 2).map((c: any) => c.key)].filter((c) => c);
      this.dd.push(...this.service.childsId.getValue().filter((c: any) => c.path.includes(2)).map((c: any) => c.key))

    });
  }

  list() {
    if (!this.raw?.tree) {
      return [];
    }
    return Object.values(this.raw?.tree).filter((c, i) => i > 0 && i < 5).map((c: any) => c.key);
  }
  public catalog: any = { "tree": [] };
  public els: any = [];
  ngOnInit() {
    this.service.catalog.subscribe((d: any) => {
      this.catalog = d;
    })
    this.service.globalFetch();
  }



  public r: any = [];
  public breadcrumb = [];
  mouse(titile: any) {
    this.dd = [];
    let r: any = Object.values(this.raw.tree).filter((c: any) => c).find((c: any) => c.key == titile);
    this.breadcrumb = r.path;
    r = r.path[r.path.length - 1];
    this.dd.push(...this.service.childsId.getValue().filter((c: any) => c.path.includes(r)).map((c: any) => c.key))

  }
  toggle() {
    this.catalog_popup = !this.catalog_popup;
  }

  go(title: any) {
    let r: any = Object.values(this.raw.tree).filter((c: any) => c).find((c: any) => c.key == title);
    r = r.path[r.path.length - 1];
    this.router.navigate(['/catalog', r])
  }

}


