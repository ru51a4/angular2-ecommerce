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
    const id = this.route.snapshot.params['id'];

    this.service.breadcrump.next(this.service.catalog.getValue().tree[id].path);

    this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    ).subscribe(() => {
      const id = this.route.snapshot.params['id'];

      this.service.breadcrump.next(this.service.catalog.getValue().tree?.[id]?.path);

      this.fetch();

    })
    this.fetch();
  }
  public props: any = [];
  public values: any = [];
  fetch() {
    this.props = [];
    this.values = [];
    const id = this.route.snapshot.params['id'];

    forkJoin([this.service.getProducts(id, 1), this.service.getProducts(id, 2)]).subscribe((d: any) => {

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


      this.props = d[0].props.res.map((c: any) => c.name);
      Object.values(d[0].props.values).forEach((arr: any) => {
        arr.forEach((d: any) => {
          if (!this.values[d.name]) {
            this.values[d.name] = []
          }
          this.values[d.name].push(decodeHTMLEntities(d.value))
        })
      });
      console.log(this.values)
      this.els = d[0].els;
    });
  }
  toggle() {
    this.allFilter = true;
  }

  ngOnDestroy(): void {
    this.service.breadcrump.next(null);
  }
}
