import * as actioncart from '../actions/cart';
import { CartItem, ShoppingCart, ICartItemWithProduct } from '@box/models';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
  cart: ShoppingCart;
  deliveryTotal: number;
  grossTotal: number;
  itemsTotal: number;
  cartItems: ICartItemWithProduct[];
  cartItemCount: number;
  cartString: String;
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
  cart: null,
  deliveryTotal: 0,
  grossTotal: 0,
  itemsTotal: 0,
  cartItems: [],
  cartItemCount: 0,
  cartString: null,
};

export function reducer(
  state = initialState,
  action: actioncart.Actions
): State {
  switch (action.type) {
    case actioncart.LOAD_CART: {
      return {
        ...state,
        loading: true,
      };
    }

    case actioncart.LOAD_CART_SUCCESS: {
      return {
        loaded: true,
        loading: false,
        ids: action.payload.items.map((item) => item.productId),
        cart: action.payload,
        deliveryTotal: action.payload.deliveryTotal,
        grossTotal: action.payload.grossTotal,
        itemsTotal: action.payload.itemsTotal,
        cartItems: action.payload.items.map((item) => {
          const product = item.product;
          return {
            ...item,
            product,
            totalCost: product.recommendedRetailPrice * item.quantity
          };
        }),
        cartItemCount: action.payload.items.map((x) => x.quantity).reduce((p, n) => p + n, 0),
        cartString: action.payload.cartString
      }
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;

export const getCart = (state: State) => state.cart;

export const getDeliveryTotal = (state: State) => state.deliveryTotal;

export const getGrossTotal = (state: State) => state.grossTotal;

export const getItemsTotal = (state: State) => state.itemsTotal;

export const getCartItems = (state: State) => state.cartItems;

export const getCartItemCount = (state: State) => state.cartItemCount;

export const getCartString = (state: State) => state.cartString;


