import { AfterContentInit, Component, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
import { ProductCardDirective } from './product-card.directive';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Subscription } from "rxjs/Subscription";
import { SnackBarService } from '@box/services/snackbar.service';
import { AddToCartPosition, AddToCartType, CartService, CartItem, BaseCartItem } from 'ng-shopping-cart';

import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Component({
    selector: 'product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ProductCardComponent implements AfterContentInit, OnDestroy {
    @Input() stockItem;

    title;
    constructor(
        private cartService: CartService<any>,
        private snack: SnackBarService,
    ) {
        this.title = "Small plates, salads & sandwiches in an intimate setting with 12 indoor seats plus patio seating.";
    }

    ngOnInit() {

    }

    ngAfterContentInit(): void {
    }

    public addItem(event) {
        event.preventDefault();
        event.stopPropagation();
        this.increase(this.createBaseCartItem(this.stockItem));
        this.sendMessage("add to cart sucessfully!");
        return false;
    }

    public removeItem(event) {
        event.preventDefault();
        event.stopPropagation();
        this.decrease(this.createBaseCartItem(this.stockItem));
        return false;
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

    sendMessage(message: string): void {
        this.snack.sendMessage(message);
    }

    clearMessage(): void {
        this.snack.clearMessage();
    }

    createBaseCartItem(stockItem): BaseCartItem {
        const cartItem: any = this.cartService.getItem(stockItem.id);
        const newItem: BaseCartItem = new BaseCartItem({
            id: stockItem.id,
            name: stockItem.stockItemName,
            price: stockItem.unitPrice,
            quantity: stockItem.quantity,
            image: stockItem.gravatar
        });
        newItem.setQuantity(stockItem.quantityPerOuter-1);
        return cartItem || newItem;
    }

    ngOnDestroy() {
    }
}
