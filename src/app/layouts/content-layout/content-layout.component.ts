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
  public raw: any = [];
  constructor(private router: Router, @Inject(DOCUMENT) private document: Document, public service: GlobalService) {
    this.router.events.subscribe(() => {
      this.url = this.router.url;
      this.catalog_popup = false;
      this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
    })
    this.service.catalog.subscribe((d: any) => {
      this.raw = d;
      this.d = [...d.tree?.filter((c: any) => c.path.length == 2).map((c: any) => c.key)].filter((c) => c);
      let r = 2
      let arr = this.raw.tree.filter((c: any) => c.path.includes(r))
      this.dd = [];
      for (let i = 0; i <= arr.length - 1; i++) {
        let curr = arr.filter((c: any) => c.path.includes(arr[i].path[arr[i].path.length - 1]))
        if (curr.length == 1) {
          this.dd.push(curr[0].key)
        }

      }
      // this.dd = this.raw.tree.filter((c: any) => c.path.includes(r)).filter((c: any) => c).map((c: any) => c.key)

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
    this.service.getProducts(1, 1).pipe(switchMap((data: any) => {
      this.els = data.els;
      return this.service.getProducts(1, 2)
    })).subscribe((data: any) => {
      let t = data.tree
      console.log({ data })
      this.els = [
        ...this.els,
        ...data.els
      ];
      let dfs = (node: any) => {
        for (let key in node) {
          if (node[key]['key']) {
            this.catalog.tree[key] = node[key];
            dfs(node[key]);
          }
        }
      }
      dfs(t[1])
      this.catalog.tree[1] = t[1];
      this.service.catalog.next(this.catalog);

      console.log(this.catalog)
    });
  }



  public r: any = [];
  public breadcrumb = [];
  mouse(titile: any) {
    console.log(this.raw.tree)
    let r = this.raw.tree.filter((c: any) => c).find((c: any) => c.key == titile);
    this.breadcrumb = r.path;

    r = r.path[r.path.length - 1];
    this.dd = [];
    let arr = this.raw.tree.filter((c: any) => c.path.includes(r))
    for (let i = 0; i <= arr.length - 1; i++) {
      let curr = arr.filter((c: any) => c.path.includes(arr[i].path[arr[i].path.length - 1]))
      if (curr.length == 1) {
        this.dd.push(curr[0].key)
      }

    }
  }
  toggle() {
    this.catalog_popup = !this.catalog_popup;
  }

  go(title: any) {
    let r = this.raw.tree.filter((c: any) => c).find((c: any) => c.key == title);
    r = r.path[r.path.length - 1];
    this.router.navigate(['/catalog', r])
  }

}


