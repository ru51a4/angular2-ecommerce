import { Component } from '@angular/core';
@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.css']
})
export class ContentLayoutComponent {
  public catalog_popup = false;
  constructor() {
  }

  toggle() {
    this.catalog_popup = !this.catalog_popup;
  }

}


