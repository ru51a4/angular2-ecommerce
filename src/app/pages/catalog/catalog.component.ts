import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent {

  public allFilter = false;

  constructor() {

  }
  toggle() {
    this.allFilter = true;
  }
}
