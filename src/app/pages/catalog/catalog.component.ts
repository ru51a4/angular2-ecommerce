import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, forkJoin } from 'rxjs';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnDestroy {

  public allFilter = false;
  public els: any = [];
  constructor(public router: Router, private route: ActivatedRoute, public service: GlobalService) {

  }
  ngOnInit() {

    let id = this.route.snapshot.params['id'];


    this.service.globalFetch().subscribe(() => {

      id = this.service.slugs.getValue()[id] ?? 0
      this.currentCategoryId = id;

      this.service.breadcrump.next(this.service.catalog.getValue().tree[id].path);

      this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      ).subscribe(() => {
        let id = this.route.snapshot.params['id'];
        id = this.service.slugs.getValue()[id]
        this.service.breadcrump.next(this.service.catalog.getValue().tree?.[id]?.path);
        this.fetch();

      })
      this.fetch();

    });
  }
  public props: any = [];
  public values: any = [];
  public propsId: any = [];
  public init = false;
  public currentCategoryId = []
  fetch(where: any = []) {
    let id = this.route.snapshot.params['id'];
    id = this.service.slugs.getValue()[id]

    forkJoin([this.service.getProductsFilter(id, 1, where), this.service.getProductsFilter(id, 2, where)]).subscribe((d: any) => {

      d[0].els = [...d[0].els, ...d[1].els];
      function decodeHTMLEntities(text: any) {
        const entities: any = {
          '&quot;': '"',
          '&amp;': '&',
          '&lt;': '<',
          '&gt;': '>',
          '&#39;': "'",
          '&nbsp;': ' '
        };

        return text.replace(/&(quot|amp|lt|gt|#39|nbsp);/g, (match: any, entity: any) => {
          return entities[match] || match;
        });
      }
      this.els = d[0].els;
      this.currFilter = true;
      if (this.currentCategoryId == id && this.init) {
        return
      }
      this.init = true;
      this.allFilter = false;
      this.props = [];
      this.values = [];
      this.propsId = [];

      this.currentCategoryId = id;
      this.props = d[0].props.res.map((c: any) => c.name);
      Object.values(d[0].props.values).forEach((arr: any) => {
        arr.forEach((d: any) => {
          if (!this.values[d.name]) {
            this.values[d.name] = []
          }
          this.values[d.name].push({ title: decodeHTMLEntities(d.value), "val": false, "id": d.id })
        })
      });
      d[0].props.res.forEach((d: any) => {
        this.propsId[d.name] = d.id;
      });
    });
  }
  public currFilterCount = -1;
  public currFilter = true;
  public disabled = false;
  ffilter(id: any) {

    let key = Object.keys(this.values).filter((c) => c != 'photo' && c != 'DETAIL_PICTURE');
    let where: any = {};
    for (let i = 0; i <= key.length - 1; i++) {
      let t: any = [];
      this.values[key[i]].filter((c: any) => c.val).forEach((val: any) => {
        console.log({ val })
        if (!where[this.propsId[key[i]]]) {
          where[this.propsId[key[i]]] = [];
        }
        where[this.propsId[key[i]]].push(val.id)
      });
    }
    this.fetch(where)
    if (this.currFilter == false) {
      return;
    }
    this.currFilter = false;
    this.currFilterCount = id;
    this.disabled = true;
    setTimeout(() => {
      this.disabled = false;
      this.currFilterCount = -1;
    }, 1000)
  }
  toggle() {
    this.allFilter = true;
  }
  public minPrice = 0;
  public maxPrice = 10000;
  slider(e: any, t: any) {
    if (t == 1) {
      this.minPrice = e.target.value
    } else {
      this.maxPrice = e.target.value
    }
  }
  ngOnDestroy(): void {
    this.service.breadcrump.next(null);
  }
}
