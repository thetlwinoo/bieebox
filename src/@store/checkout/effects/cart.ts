import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Effect, Actions } from '../../../../modules/effects';
import { Action } from '../../../../modules/store';
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { ShoppingCartService } from "@box/services/cart.service";
import { DeliveryService } from "@box/services/delivery.service";
import * as checkout from '../actions/cart';
import { ShoppingCart, DeliveryOption } from '@box/models';

@Injectable()
export class CartEffects {
    @Effect()
    loadcart$ = this.actions$
        .ofType<checkout.LoadCart>(checkout.LOAD_CART)
        .switchMap(() => {
            return this.shoppingCartService
                .get()
                .map(cart => new checkout.LoadCartSuccess(cart))
                .catch(error => of(new checkout.ErrorHandler(error)))
        });

    @Effect()
    addtocart$: Observable<Action> = this.actions$
        .ofType<checkout.AddToCart>(checkout.ADD_TO_CART)
        .map((action: checkout.AddToCart) => action.payload)
        .switchMap(product =>
            this.shoppingCartService
                .addItem(product, 1)
                .map(() => new checkout.AddToCartSuccess(product))
                .catch(error => of(new checkout.ErrorHandler(error)))
        );

    @Effect()
    removefromcart$: Observable<Action> = this.actions$
        .ofType<checkout.RemoveFromCart>(checkout.REMOVE_FROM_CART)
        .map((action: checkout.RemoveFromCart) => action.payload)
        .switchMap(product =>
            this.shoppingCartService
                .addItem(product, -1)
                .map(() => new checkout.RemoveFromCartSuccess(product))
                .catch(error => of(new checkout.ErrorHandler(error)))
        );

    @Effect()
    removeCartItem$: Observable<Action> = this.actions$
        .ofType<checkout.RemoveCartItem>(checkout.REMOVE_CART_ITEM)
        .map((action: checkout.RemoveCartItem) => action.payload)
        .switchMap(cartitem =>
            this.shoppingCartService
                .addItem(cartitem.exclusiveItem, -cartitem.quantity)
                .map(() => new checkout.RemoveCartItemSuccess(cartitem))
                .catch(error => of(new checkout.ErrorHandler(error)))
        );

    @Effect()
    constanttocart$: Observable<Action> = this.actions$
        .ofType<checkout.ConstantToCart>(checkout.CONSTANT_TO_CART)
        .map((action: checkout.ConstantToCart) => action.payload)
        .switchMap(productToCart =>
            this.shoppingCartService
                .addItem(productToCart.exclusiveItem, +productToCart.quantity, true)
                .map((product) => new checkout.ConstantToCartSuccess(product))
                .catch(error => of(new checkout.ErrorHandler(error)))
        );

    @Effect()
    emptycart$: Observable<Action> = this.actions$
        .ofType<checkout.EmptyCart>(checkout.EMPTY_CART)
        .switchMap(() => {
            return this.shoppingCartService
                .empty()
                .map(() => new checkout.EmptyCartSuccess(true))
                .catch(error => of(new checkout.ErrorHandler(error)))
        });

    @Effect()
    loaddeliveryoption$: Observable<Action> = this.actions$
        .ofType<checkout.LoadDeliveryOption>(checkout.LOAD_DELIVERY_OPTION)
        .map((action: checkout.LoadDeliveryOption) => action.payload)
        .switchMap((query) => {
            return this.deliveryService
                .deliveryOptions$(query)
                .map((deliveryOption: DeliveryOption[]) => new checkout.LoadDeliveryOptionSuccess(deliveryOption))
                .catch(error => of(new checkout.ErrorHandler(error)))
        });

    @Effect()
    setdeliveryoption$: Observable<Action> = this.actions$
        .ofType<checkout.SetDeliveryOption>(checkout.SET_DELIVERY_OPTION)
        .map((action: checkout.SetDeliveryOption) => action.payload)
        .switchMap(option =>
            this.shoppingCartService
                .setDeliveryOption(option)
                .map(() => new checkout.SetDeliveryOptionSuccess(true))
                .catch(error => of(new checkout.ErrorHandler(error)))
        );

    constructor(
        private actions$: Actions,
        private shoppingCartService: ShoppingCartService,
        private deliveryService: DeliveryService
    ) { }
}
