import { Component, OnInit } from '@angular/core';
import { AddToCartPosition, AddToCartType, CartService, CartItem, BaseCartItem, LocaleFormat } from 'ng-shopping-cart';
import { carousel } from '@box/carousel';
import { boxAnimations } from '@box/animations';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations   : boxAnimations
})
export class CartComponent implements OnInit {

  format: LocaleFormat;
  empty = true;
  items: CartItem[];
  taxRate = 0;
  tax = 0;
  shipping = 0;
  cost = 0;
  totalCount = 0;
  private _serviceSubscription: any;
  carousel: any;

  constructor(
    private cartService: CartService<any>,
  ) {
    this.update();
    this._serviceSubscription = this.cartService.onChange.subscribe(() => {
      this.update();
    });

    this.carousel = carousel;
  }

  ngOnInit() {
  }

  increase(item: CartItem) {
    item.setQuantity(item.getQuantity() + 1);
    this.cartService.addItem(item);
  }

  decrease(item: CartItem) {
    if (item.getQuantity() > 1) {
      item.setQuantity(item.getQuantity() - 1);
      this.cartService.addItem(item);
    } else {
      this.cartService.removeItem(item.getId());
    }
  }

  remove(event, item: CartItem) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.removeItem(item.getId());
    return false;
  }

  update() {
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
}
