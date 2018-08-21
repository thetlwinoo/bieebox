import { Action } from '../../../../modules/store';
import { ShoppingCart, ExclusiveCartItem, CartItem, ICartItemWithProduct, DeliveryOption } from '@box/models';

export const LOAD_CART = '[Cart] Load Cart';
export const LOAD_CART_SUCCESS = '[Cart] Load Cart Success';
export const ADD_TO_CART = '[Cart] Add To Cart';
export const ADD_TO_CART_SUCCESS = '[Cart] Add To Cart Success';
export const REMOVE_FROM_CART = '[Cart] Remove From Cart';
export const REMOVE_FROM_CART_SUCCESS = '[Cart] Remove From Cart Success';
export const REMOVE_CART_ITEM = '[Cart] Remove Cart Item';
export const REMOVE_CART_ITEM_SUCCESS = '[Cart] Remove Cart Item Success';
export const CONSTANT_TO_CART = '[Cart] Constant To Cart';
export const CONSTANT_TO_CART_SUCCESS = '[Cart] Constant To Cart Success';
export const EMPTY_CART = '[Cart] Empty Cart';
export const EMPTY_CART_SUCCESS = '[Cart] Empty Cart Success';
export const LOAD_DELIVERY_OPTION = '[Cart] Load Delivery Option';
export const LOAD_DELIVERY_OPTION_SUCCESS = '[Cart] Load Delivery Option Success';
export const SET_DELIVERY_OPTION = '[Cart] Set Delivery Option';
export const SET_DELIVERY_OPTION_SUCCESS = '[Cart] Set Delivery Option Success';
export const ERROR_HANDLER = '[Cart] Error Handler';

export class LoadCart implements Action {
    readonly type = LOAD_CART;
}

export class LoadCartSuccess implements Action {
    readonly type = LOAD_CART_SUCCESS;

    constructor(public payload: ShoppingCart) { }
}


export class AddToCart implements Action {
    readonly type = ADD_TO_CART;

    constructor(public payload: ExclusiveCartItem) { }
}

export class AddToCartSuccess implements Action {
    readonly type = ADD_TO_CART_SUCCESS;

    constructor(public payload: ExclusiveCartItem) { }
}

export class RemoveFromCart implements Action {
    readonly type = REMOVE_FROM_CART;

    constructor(public payload: ExclusiveCartItem) { }
}

export class RemoveFromCartSuccess implements Action {
    readonly type = REMOVE_FROM_CART_SUCCESS;

    constructor(public payload: ExclusiveCartItem) { }
}

export class RemoveCartItem implements Action {
    readonly type = REMOVE_CART_ITEM;

    constructor(public payload: CartItem) { }
}

export class RemoveCartItemSuccess implements Action {
    readonly type = REMOVE_CART_ITEM_SUCCESS;

    constructor(public payload: CartItem) { }
}

export class ConstantToCart implements Action {
    readonly type = CONSTANT_TO_CART;

    constructor(public payload: CartItem) { }
}

export class ConstantToCartSuccess implements Action {
    readonly type = CONSTANT_TO_CART_SUCCESS;

    constructor(public payload: ExclusiveCartItem) { }
}

export class EmptyCart implements Action {
    readonly type = EMPTY_CART;
}

export class EmptyCartSuccess implements Action {
    readonly type = EMPTY_CART_SUCCESS;

    constructor(public payload: boolean) { }
}

export class LoadDeliveryOption implements Action {
    readonly type = LOAD_DELIVERY_OPTION;

    constructor(public payload: string) { }
}

export class LoadDeliveryOptionSuccess implements Action {
    readonly type = LOAD_DELIVERY_OPTION_SUCCESS;

    constructor(public payload: DeliveryOption[]) { }
}

export class SetDeliveryOption implements Action {
    readonly type = SET_DELIVERY_OPTION;

    constructor(public payload: DeliveryOption) { }
}

export class SetDeliveryOptionSuccess implements Action {
    readonly type = SET_DELIVERY_OPTION_SUCCESS;

    constructor(public payload: boolean) { }
}

export class ErrorHandler implements Action {
    readonly type = ERROR_HANDLER;

    constructor(public payload: any) { }
}

export type Actions =
    LoadCart
    | LoadCartSuccess
    | AddToCart
    | AddToCartSuccess
    | RemoveFromCart
    | RemoveFromCartSuccess
    | RemoveCartItem
    | RemoveCartItemSuccess
    | ConstantToCart
    | ConstantToCartSuccess
    | EmptyCart
    | EmptyCartSuccess
    | LoadDeliveryOption
    | LoadDeliveryOptionSuccess
    | SetDeliveryOption
    | SetDeliveryOptionSuccess
    | ErrorHandler;
