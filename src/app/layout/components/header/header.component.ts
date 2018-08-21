import { Component, OnDestroy, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRouteSnapshot, CanActivate, NavigationExtras } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import * as KeywordActions from '@store/keywords/actions/keyword.actions';
import * as fromKeywords from '@store/keywords/reducers';

import * as fromRoot from '../../../reducers';
import * as fromCheckout from '@store/checkout/reducers';
import * as CartActions from '@store/checkout/actions/cart';
import * as cart from '@store/checkout/actions/cart';
import { StockItem, ShoppingCart, ICartItemWithProduct } from '@box/models';

import { HeaderService } from './header.service';

import { AddToCartPosition, AddToCartType, CartService, CartItem, BaseCartItem, LocaleFormat } from 'ng-shopping-cart';

@Component({
    selector: 'header',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, OnDestroy {
    currentUrl: any;
    defaultKeywords: any;

    searchQuery$: Observable<string>;
    keywords$: Observable<String[]>;
    loading$: Observable<boolean>;
    error$: Observable<string>;

    cart$: Observable<ShoppingCart>;
    itemCount$: Observable<number>;

    private _unsubscribeAll: Subject<any>;

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
        // private keywordStore: Store<fromKeywords.State>,
        private store: Store<fromKeywords.State>,
        private _headerService: HeaderService,
        private _router: Router,
        private cartService: CartService<any>
    ) {

        this.searchQuery$ = store.pipe(
            select(fromKeywords.getSearchQuery),
            take(1)
        );

        this.keywords$ = store.pipe(select(fromKeywords.getSearchResults));
        this.loading$ = store.pipe(select(fromKeywords.getSearchLoading));
        this.error$ = store.pipe(select(fromKeywords.getSearchError));

        // this.cart$ = store.pipe(select(fromCheckout.getCart));
        // this.itemCount$ = store.pipe(select(fromCheckout.getCartItemCount));

        this._unsubscribeAll = new Subject();

        this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.currentUrl = event.url;
                // (event.url == '/' || event.url == '/pages/shop') ? true : false;
            }
        });

        this._headerService.getDefaultKeywords({ $limit: 20 }).then(keywords => this.defaultKeywords = keywords);
    }

    ngOnInit() {
        this.update();
        this._serviceSubscription = this.cartService.onChange.subscribe(() => {
            this.update();
        });
    }

    search(query: string) {
        this.store.dispatch(new KeywordActions.Search(query));
    }

    removeCartItem(event, cartItem) {
        event.preventDefault();
        event.stopPropagation();
        this.store.dispatch(new CartActions.RemoveCartItem(cartItem));
        return false;
    }
    onSummit(event) {
        let navigationExtras: NavigationExtras = {
            queryParams: { 'search': event },
            fragment: 'anchor'
        };

        this._router.navigate(['/pages/shop'], navigationExtras);
    }

    ngOnDestroy(): void {
        this._serviceSubscription.unsubscribe();
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
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

    remove(event,item: CartItem){
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
        console.log('Cart Serbice',this.items, this.totalCount)
    }
}
