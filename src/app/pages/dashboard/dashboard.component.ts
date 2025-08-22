import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
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

}
