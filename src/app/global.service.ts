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
  public breadcrump = new BehaviorSubject([])
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
    let val = this.cart.getValue()[id]
    this.cart.next([...this.cart.getValue().filter((c: any, i: any) => c != val)])
    localStorage.setItem('cart', JSON.stringify(this.cart.getValue()))
  }

  setUser(data: any) {
    console.log(data);
    this.user.next(data);
  }
  getProducts(sectionId: any, page: any) {
    return this.http.get(`${this.apiUrl}/index/${sectionId}/${page}`)

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
  globalFetch() {
    this.getProducts(1, 1).pipe(switchMap((data: any) => {
      let t = data.tree
      let catalog: any = { "tree": {} };
      let dfs = (node: any) => {
        for (let key in node) {
          if (node[key]['key']) {
            catalog.tree[key] = node[key];
            dfs(node[key]);
          }
        }
      }
      dfs(t[1])
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
      return forkJoin(rr.sort(() => .5 - Math.random()).map((c) => this.getProducts(c, 1)));
    })).subscribe((data: any) => {
      let els = [];
      for (let i = 0; i <= data.length - 1; i++) {
        els.push(...data[i].els)
      }
      els = els.filter((c: any, i: any) => i <= 7)
      this.els.next(els);

    });

  }
}

