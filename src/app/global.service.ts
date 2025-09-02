import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Subject, forkJoin, switchMap } from "rxjs";
import { tick } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  service: any;

  constructor(public http: HttpClient) {
    let cart: any = localStorage.getItem('cart') ?? '[]';
    this.cart.next(JSON.parse(cart))
  }
  public apiUrl = 'https://iblockcms.mooo.com/api'
  modals = new BehaviorSubject(false);
  public breadcrump: any = new BehaviorSubject([])
  user = new BehaviorSubject<any>({});
  public catalog: any = new BehaviorSubject({ tree: {} });
  public els: any = new BehaviorSubject([]);
  public childsId: any = new BehaviorSubject([]);
  public childsIds: any = new BehaviorSubject([]);
  public currentDetailTitle: any = new BehaviorSubject('')

  public cart: any = new BehaviorSubject([]);
  addToCard(id: any) {
    this.cart.next([...this.cart.getValue(), id])
    localStorage.setItem('cart', JSON.stringify(this.cart.getValue()))
  }
  deleteToCardOne(id: any) {
    let index = this.cart.getValue().indexOf(id)
    this.cart.next([...this.cart.getValue().filter((c: any, i: any) => index != i)])
    localStorage.setItem('cart', JSON.stringify(this.cart.getValue()))
  }
  deleteToCard(id: any) {
    console.log({ id, d: this.cart.getValue() })
    let nnew = this.cart.getValue().filter((c: any, i: any) => c != id);
    this.cart.next([...nnew])
    localStorage.setItem('cart', JSON.stringify(this.cart.getValue()))
  }

  setUser(data: any) {
    console.log(data);
    this.user.next(data);
  }
  getProducts(sectionId: any, page: any) {
    return this.http.get(`${this.apiUrl}/index/${sectionId}/${page}`)
  }

  getProductsFilter(sectionId: any, page: any, filter: any) {
    return this.http.post(`${this.apiUrl}/filter/${sectionId}/${page}`, { filter })
  }
  getProduct(id: any) {
    return this.http.get(`${this.apiUrl}/detail/${id}`)
  }
  decodeHTMLEntities(text: any) {
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
  public slugs: any = new BehaviorSubject(null);
  public slugels: any = new BehaviorSubject({});

  globalFetch() {
    let _await = new Subject();

    if (this.slugs.getValue()) {
      setTimeout(() => {
        _await.next(true);
      }, 0)
      return _await
    }
    let _slugs: any = {};
    this.getProducts(1, 1).pipe(switchMap((data: any) => {
      let t = data.tree
      let catalog: any = { "tree": {} };
      let dfs = (node: any, id: any = null) => {
        _slugs[node.slug[node.slug.length - 1]] = Number(id) ?? null
        for (let key in node) {
          if (node[key]['key']) {
            catalog.tree[key] = node[key];
            dfs(node[key], key);
          }
        }
      }
      _slugs['catalog'] = 1;
      dfs(t[1])
      this.slugs.next(_slugs)
      catalog.tree[1] = t[1];
      let r = [];
      let rr = [];
      let arr = Object.keys(catalog.tree);
      for (let i = 0; i <= arr.length - 1; i++) {
        let counter = 0;
        let item1 = arr[i]
        for (let j = 0; j <= arr.length - 1; j++) {
          let item2 = arr[j];
          if (catalog.tree[item2].path.includes(Number(item1))) {
            counter++
          }
        }
        if (counter == 1) {
          r.push(catalog.tree[item1]);
          rr.push(item1);
        }
      }
      this.childsId.next(r);
      this.catalog.next(catalog);
      this.childsIds.next(rr);
      return forkJoin([
        ...rr.sort(() => .5 - Math.random()).map((c) => this.getProducts(c, 1)),
        ...rr.sort(() => .5 - Math.random()).map((c) => this.getProducts(c, 2))
      ]);
    })).subscribe((data: any) => {
      let _slugs: any = {};
      let els = [];
      for (let i = 0; i <= data.length - 1; i++) {
        els.push(...data[i].els)
      }
      els.forEach((item: any) => {
        _slugs[item.slug] = Number(item.id) ?? null
      })
      this.slugels.next(_slugs)
      els = els.filter((c: any, i: any) => i <= 7)
      this.els.next(els);
      _await.next(true)
    });
    return _await;

  }
  find(str: any) {
    return this.http.get(this.apiUrl + `/index2/${str}`)
  }
}



