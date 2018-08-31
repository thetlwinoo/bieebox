import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Address } from '@box/models';
import { AddToCartPosition, AddToCartType, CartService, CartItem, BaseCartItem, LocaleFormat } from 'ng-shopping-cart';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'view-checkout-page',
  templateUrl: './view-checkout-page.component.html',
  styleUrls: ['./view-checkout-page.component.scss']
})
export class ViewCheckoutPageComponent implements OnInit, OnDestroy {
  @Output() create = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  @Output() createOrder = new EventEmitter<any>();
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
  private serviceSubscription: Subscription;

  constructor(
    private cartService: CartService<any>,
  ) {
    this.updateCart();
    this.serviceSubscription = this.cartService.onChange.subscribe(() => {
      this.updateCart();
    });
  }

  ngOnInit() {

    if (this.createSuccess) {
      this.isChanged = false;
    }
  }

  ngOnDestroy() {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
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
  }

  onChangeDefault(event) {
    this.defaultAddress = event.value;
  }

  onSaveDefault(event) {
    const updateAddress = {
      id: event.id,
      person: event.person._id,
      default: true,
    };
    this.update.emit(updateAddress);
    this.isChanged = !this.isChanged;
  }

  onCreateOrder(event) {
    this.createOrder.emit({
      cart: {
        taxRate: this.taxRate,
        tax: this.tax,
        shipping: this.shipping,
        cost: this.cost,
        format: this.format,
        itemCount: this.totalCount,
        items: this.items
      }
    })
  }
}
