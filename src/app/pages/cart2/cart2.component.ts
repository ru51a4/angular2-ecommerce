import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BuyModalComponent } from 'src/app/components/buy-modal/buy-modal.component';

@Component({
  selector: 'app-cart2',
  templateUrl: './cart2.component.html',
  styleUrls: ['./cart2.component.scss'],
})
export class Cart2Component {
  constructor(private router: Router) {

  }
  public curr1 = 1;
  public curr2 = 1;
  public dirty = false;
  public form1 = new FormGroup({
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    house: new FormControl('', Validators.required),
    num_house: new FormControl(),
    flat: new FormControl(),
    index: new FormControl(),
    comment: new FormControl(),
  });

  public form2 = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    phone: new FormControl('', Validators.required),
    email: new FormControl(),
    comment: new FormControl(),
  })
  toggle1(id: any) {
    this.curr1 = id;
  }

  toggle2(id: any) {
    this.curr2 = id;
  }
  submit() {
    this.dirty = true;
    let valid = true
    if (this.curr1 != 1) {
      valid = (this.form1.valid);
    }
    valid = valid && this.form2.valid;
    if (valid) {
      this.router.navigate(['/success'])
    }
  }

}
