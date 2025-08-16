import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.css']
})
export class ContentLayoutComponent {
  public catalog_popup = false;
  public url = '';
  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.url = this.router.url;
      this.catalog_popup = false;
    })
  }

  toggle() {
    this.catalog_popup = !this.catalog_popup;
  }

}


