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
  ngOnInit() {
  }

}
