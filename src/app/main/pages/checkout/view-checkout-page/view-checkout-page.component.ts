import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Address } from '@box/models';
import { AddToCartPosition, AddToCartType, CartService, CartItem, BaseCartItem, LocaleFormat } from 'ng-shopping-cart';

@Component({
  selector: 'view-checkout-page',
  templateUrl: './view-checkout-page.component.html',
  styleUrls: ['./view-checkout-page.component.scss']
})
export class ViewCheckoutPageComponent implements OnInit {
  @Output() create = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  // @Output() updateMany = new EventEmitter<any>();
  @Output() opendialog = new EventEmitter<any>();

  @Input() addresses: any;
  @Input() loading: any;
  @Input() error: any;
  @Input() selected: any;
  @Input() createSuccess: any;

  defaultAddress: any;

  isChanged: boolean = false;

  format: LocaleFormat;
  empty = true;
  items: CartItem[];
  taxRate = 0;
  tax = 0;
  shipping = 0;
  cost = 0;
  totalCount = 0;
  private _serviceSubscription: any;

  constructor(
    private cartService: CartService<any>,
  ) {
    this.updateCart();
    this._serviceSubscription = this.cartService.onChange.subscribe(() => {
      this.updateCart();
    });

    // console.log(this.createSuccess)
  }

  ngOnInit() {
    
    if(this.createSuccess){
      this.isChanged = false;
    }
  }

  updateCart() {
    this.empty = this.cartService.isEmpty();
    this.items = this.cartService.getItems();
    this.taxRate = this.cartService.getTaxRate() / 100;
    this.tax = this.cartService.getTax();
    this.shipping = this.cartService.getShipping();
    this.cost = this.cartService.totalCost();
    this.format = <LocaleFormat>this.cartService.getLocaleFormat(true);
    this.totalCount = this.cartService.itemCount();

    console.log(this.items)
  }

  onChangeDefault(event) {
    // this.defaultAddress = new Address(event.value);
    this.defaultAddress = event.value;
  }

  onSaveDefault(event) {
    console.log(event)
    const updateAddress = {
      id: event.id,
      person: event.person._id,
      default: true,
    };
    console.log(updateAddress)
    this.update.emit(updateAddress);
    this.isChanged = !this.isChanged;
  }
}
