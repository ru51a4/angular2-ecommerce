import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BuyModalComponent } from 'src/app/components/buy-modal/buy-modal.component';
@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.css']
})
export class ContentLayoutComponent {
  public catalog_popup = false;
  public url = '';
  constructor(private router: Router, @Inject(DOCUMENT) private document: Document) {
    this.router.events.subscribe(() => {
      this.url = this.router.url;
      this.catalog_popup = false;
      this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
    })
  }

  toggle() {
    this.catalog_popup = !this.catalog_popup;
  }

}


