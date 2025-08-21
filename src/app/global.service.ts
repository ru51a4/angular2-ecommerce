import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() {
  }

  modals = new BehaviorSubject(false);

  user = new BehaviorSubject<any>({});

  setUser(data: any) {
    console.log(data);
    this.user.next(data);
  }
}
