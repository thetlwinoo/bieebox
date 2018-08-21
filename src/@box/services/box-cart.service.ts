import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { environment } from 'environments/environment';
import { AddToCartPosition, AddToCartType, CartService, CartItem, BaseCartItem, LocaleFormat } from 'ng-shopping-cart';

@Injectable()
export class BoxCartService {

    format: LocaleFormat;
    empty = true;
    items: CartItem[];
    taxRate = 0;
    tax = 0;
    shipping = 0;
    cost = 0;

    public constructor(
        private cartService: CartService<any>
    ) {
        this.empty = this.cartService.isEmpty();
        this.items = this.cartService.getItems();
        this.taxRate = this.cartService.getTaxRate() / 100;
        this.tax = this.cartService.getTax();
        this.shipping = this.cartService.getShipping();
        this.cost = this.cartService.totalCost();
        this.format = <LocaleFormat>this.cartService.getLocaleFormat(true);
    }

    public increase(item: CartItem): Observable<CartItem> {
        item.setQuantity(item.getQuantity() + 1);
        this.cartService.addItem(item);

        return Observable.of(item);
    }

    public decrease(item: CartItem): Observable<CartItem> {
        if (item.getQuantity() > 1) {
            item.setQuantity(item.getQuantity() - 1);
            this.cartService.addItem(item);
        } else {
            this.cartService.removeItem(item.getId());
        }

        return Observable.of(item);
    }
}
