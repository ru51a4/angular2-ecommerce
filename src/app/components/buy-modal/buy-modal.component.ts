import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(private router: Router, public service: GlobalService, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data)
  }
  public checkbox = false;
  pic() {
    return `https://iblockcms.mooo.com/${this.data.prop['DETAIL_PICTURE']}`
  }
  public dirty = false;

  valid() {
    return this.form.valid;
  }
  go() {
    this.dirty = true;
    if (this.valid() && this.checkbox) {
      this.service.modals.next(true);
      this.router.navigate(['/success'])
    }
  }
}
