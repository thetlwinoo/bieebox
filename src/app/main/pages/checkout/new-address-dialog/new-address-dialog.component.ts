import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Address } from '@box/models';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'new-address-dialog',
  templateUrl: './new-address-dialog.component.html',
  styleUrls: ['./new-address-dialog.component.scss']
})
export class NewAddressDialogComponent implements OnInit {
  public address: Address;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewAddressDialogComponent>
  ) { }

  ngOnInit() {
    if (this.address) {
      this.form = new FormGroup({
        id: new FormControl(this.address.id),
        people: new FormControl(this.address.people),
        addressType: new FormControl(this.address.addressType),
        addressLine1: new FormControl(this.address.addressLine1),
        addressLine2: new FormControl(this.address.addressLine2),
        city: new FormControl(this.address.city),
        stateProvince: new FormControl(this.address.stateProvince),
        country: new FormControl(this.address.country),
        geoLocation: new FormControl(this.address.geoLocation),
        postalCode: new FormControl(this.address.postalCode),
        lastEditedBy: new FormControl(this.address.lastEditedBy),
        validFrom: new FormControl(this.address.validFrom),
        validTo: new FormControl(this.address.validTo)
      });
    } else {
      this.address = new Address();

      this.form = new FormGroup({
        id: new FormControl(''),
        people: new FormControl(''),
        addressType: new FormControl(''),
        addressLine1: new FormControl(''),
        addressLine2: new FormControl(''),
        city: new FormControl(''),
        stateProvince: new FormControl(''),
        country: new FormControl(''),
        geoLocation: new FormControl(''),
        lastEditedBy: new FormControl(''),
        validFrom: new FormControl(this.address.validFrom),
        validTo: new FormControl(this.address.validTo)
      });
    }

  }
}
