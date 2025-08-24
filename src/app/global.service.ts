import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Subject } from "rxjs";
import { tick } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(public http: HttpClient) {
    let cart: any = localStorage.getItem('cart') ?? '[]';
    this.cart.next(JSON.parse(cart))
  }
  public apiUrl = 'https://iblockcms.mooo.com/api'
  modals = new BehaviorSubject(false);
  public breadcrump = new BehaviorSubject([])
  user = new BehaviorSubject<any>({});
  public catalog: any = new BehaviorSubject({});

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
}

