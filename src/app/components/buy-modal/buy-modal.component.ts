import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/global.service';
@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.scss']
})
export class BuyModalComponent {

  form = new FormGroup({
    'phone': new FormControl('', Validators.required)
  })

  constructor(private router: Router, public service: GlobalService) { }

  public dirty = false;

  valid() {
    return this.form.valid;
  }
  go() {
    this.dirty = true;
    if (this.valid()) {
      this.service.modals.next(true);
      this.router.navigate(['/success'])
    }
  }
}
