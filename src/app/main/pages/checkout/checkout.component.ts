import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { BoxSidebarService } from '@box/components/sidebar/sidebar.service';
import { boxAnimations } from '@box/animations';
import { carousel } from '@box/carousel';
import { Address } from '@box/models';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewAddressDialogComponent } from './new-address-dialog/new-address-dialog.component';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as AddressActions from '@store/address/actions/address';
import * as fromAddress from '@store/address/reducers';
import { AddressService } from '@store/address/services/address.service';
import { AuthService } from '@box/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations: boxAnimations
})
export class CheckoutComponent implements OnInit {
  address: any;
  user: any;
  carousel: any;
  addresses$: Observable<Address[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;
  selected$: Observable<Address>;

  constructor(
    private _boxSidebarService: BoxSidebarService,
    private addressService: AddressService,
    private auth: AuthService,
    private dialog: MatDialog,
    private store: Store<fromAddress.State>,
    private router: Router
  ) {
    this.carousel = carousel;
    store.dispatch(new AddressActions.Load({ $limit: 10 }));

    this.addresses$ = store.pipe(select(fromAddress.getLoadResults));
    this.loading$ = store.pipe(select(fromAddress.getAddressLoading));
    this.error$ = store.pipe(select(fromAddress.getAddressError));

    this.loading$.subscribe(load => {
      if (!load) {
        this.addresses$.subscribe(addresses => {
          if (addresses.length <= 0) {
            this.openNewAddressDialog();
          }
        })
      }
    });

    this.addressService.onUserChanged.subscribe(user => this.user = user);
  }

  ngOnInit() {
  }

  onAddressCreate(event) {
    this.store.dispatch(new AddressActions.Create(event));
  }

  onAddressRemove(event) {
    this.store.dispatch(new AddressActions.Remove(event));
  }

  onAddressUpdate(event) {    
    this.store.dispatch(new AddressActions.Update(event));
  }

  onAddressUpdateMany(event) {    
    this.store.dispatch(new AddressActions.UpdateMany(event));
  }

  toggleSidebar(name): void {
    this._boxSidebarService.getSidebar(name).toggleOpen();
  }
  openNewAddressDialog(event?) {
    let dialogRef: MatDialogRef<NewAddressDialogComponent>;
    dialogRef = this.dialog.open(NewAddressDialogComponent);
    // dialogRef.componentInstance.address = this.selected;
    dialogRef.afterClosed().subscribe(res => this.dialogCallback(res));
  }

  dialogCallback(event?: Address) {
    if (event) {
      this.address = {
        id: event.id,
        person: this.auth.getCurrentUserId(),
        // addressType: event.addressType,
        addressLine1: event.addressLine1,
        addressLine2: event.addressLine2,
        // city: event.city,
        // stateProvince: event.stateProvince,
        // country: event.country,
        geoLocation: event.geoLocation,
        postalCode: event.postalCode,
        // lastEditedBy: event.lastEditedBy,
        default: event.default,
        validFrom: event.validFrom,
        validTo: event.validTo
      };
      // console.log(event, this.user)
      this.onAddressCreate(this.address);
    }
    else {
      this.router.navigate(['/pages/home']);
    }
  }
}
