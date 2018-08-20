import { AfterContentInit, Component, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
import { ProductCardDirective } from './product-card.directive';
import { ShoppingCartService } from "@box/services/cart.service";
import { ShoppingCart, StockItem } from "@box/models";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Subscription } from "rxjs/Subscription";
import { SnackBarService } from '@box/services/snackbar.service';

@Component({
    selector: 'product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ProductCardComponent implements AfterContentInit, OnDestroy {
    @Input() stockItem;

    public cart: Observable<ShoppingCart>;
    public itemCount: number;
    private cartSubscription: Subscription;

    title;
    constructor(
        private cartService: ShoppingCartService,
        private snack: SnackBarService
    ) {
        this.title = "Small plates, salads & sandwiches in an intimate setting with 12 indoor seats plus patio seating.";

        this.cart = this.cartService.get();

    }

    ngOnInit() {

    }

    ngAfterContentInit(): void {
        this.cartSubscription = this.cart.subscribe((cart) => {
            let item = cart.items.find((p) => p.productId === this.stockItem.id);
            if (item) {
                this.itemCount = item.quantity;
            } else {
                this.itemCount = 0;
            }
        });
    }

    public existInCart(product: StockItem): boolean {
        return Observable.create((obs: Observer<boolean>) => {
            const sub = this.cartService
                .get()
                .subscribe((cart) => {
                    obs.next(cart.items.some((i) => i.productId === product.id));
                    obs.complete();
                });
            sub.unsubscribe();
        });
    }

    public addItem(event) {
        event.preventDefault();
        event.stopPropagation();
        this.cartService.addItem(this.stockItem, 1);        
        this.sendMessage("add to cart sucessfully!");
        return false;
    }

    public removeItem(event) {
        event.preventDefault();
        event.stopPropagation();
        this.cartService.addItem(this.stockItem, -1);
        return false;
    }

    sendMessage(message: string): void {
        this.snack.sendMessage(message);
    }

    clearMessage(): void {
        this.snack.clearMessage();
    }

    ngOnDestroy() {
        this.cartSubscription.unsubscribe();
    }
}
