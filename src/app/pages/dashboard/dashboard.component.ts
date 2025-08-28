import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { forkJoin, switchMap } from 'rxjs';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {



  constructor(public service: GlobalService) {

  }
  public catalog: any = { "tree": [] };
  public els: any = [];
  ngOnInit() {
    this.service.getProducts(1, 1).pipe(switchMap((data: any) => {
      let t = data.tree
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
      let r = [];
      let arr = Object.keys(this.catalog.tree);
      for (let i = 0; i <= arr.length - 1; i++) {
        let counter = 0;
        let item1 = arr[i]
        for (let j = 0; j <= arr.length - 1; j++) {
          let item2 = arr[j];
          if (this.catalog.tree[item2].path.includes(Number(item1))) {
            counter++
          }
        }
        if (counter == 1) {
          r.push(item1);
        }
      }
      console.log({ r })
      return forkJoin(r.sort(() => .5 - Math.random()).map((c) => this.service.getProducts(c, 1)));
    })).subscribe((data: any) => {
      for (let i = 0; i <= data.length - 1; i++) {
        this.els.push(...data[i].els)
      }
      this.els = this.els.filter((c: any, i: any) => i <= 7)
    });
  }

}
