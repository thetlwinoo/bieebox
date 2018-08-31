import { Component, OnInit, Inject, Output, EventEmitter, OnDestroy } from '@angular/core';
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
// import { AddressService } from '@store/address/services/address.service';
import { CheckoutService } from './checkout.service'
import { AuthService } from '@box/services/auth.service';
import * as _ from 'lodash';
import { AddToCartPosition, AddToCartType, CartService, CartItem, BaseCartItem, LocaleFormat } from 'ng-shopping-cart';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations: boxAnimations
})
export class CheckoutComponent implements OnInit, OnDestroy {
  address: any;
  // user: any;
  carousel: any;
  addresses$: Observable<Address[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;
  createSuccess$: Observable<any>;
  selected$: Observable<Address>;
  addresses: Address[];
  private serviceSubscription: any;

  constructor(
    private _boxSidebarService: BoxSidebarService,
    // private addressService: AddressService,
    private auth: AuthService,
    private dialog: MatDialog,
    private store: Store<fromAddress.State>,
    private router: Router,
    private checkoutService: CheckoutService,
    private cartService: CartService<any>
  ) {
    this.carousel = carousel;

    this.store.dispatch(new AddressActions.Load({ $limit: 10 }));
    this.addresses$ = store.pipe(select(fromAddress.getLoadResults));
    this.loading$ = store.pipe(select(fromAddress.getAddressLoading));
    this.error$ = store.pipe(select(fromAddress.getAddressError));

    // this.serviceSubscription = this.addresses$.subscribe(addresses => {
    //   console.log(addresses)
    // });
    this.serviceSubscription = this.checkoutService.onAddressesChanged.subscribe(addresses => {
      if (addresses.length <= 0) {
        this.openNewAddressDialog();
      }
    })

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }

  onOrderCreate(event) {
    this.checkoutService.createOrder(event).then(response => {
     this.cartService.clear();
      this.router.navigate(['pages/checkout-completed']);
    });
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
        contactName: event.contactName,
        phoneNumber: event.phoneNumber,
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
      this.onAddressCreate(this.address);
    }
    else {
      if (this.addresses.length <= 0) {
        this.router.navigate(['/pages/home']);
      }

    }
  }
}
