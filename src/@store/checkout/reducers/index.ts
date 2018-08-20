import { createSelector, createFeatureSelector } from '../../../../modules/store';
import * as fromCart from './cart';
// import * as fromAddress from './address';
// import * as fromOrder from './order';
import * as fromDeliveryOption from './delivery-option';
import * as fromRoot from 'app/reducers';

export interface CheckoutState {
  cart: fromCart.State;
  delivery: fromDeliveryOption.State;
//   address: fromAddress.State;
//   order: fromOrder.State;
}

export interface State extends fromRoot.State {
  checkout: CheckoutState;
}

export const reducers = {
  cart: fromCart.reducer,
  delivery: fromDeliveryOption.reducer,
//   address: fromAddress.reducer,
//   order: fromOrder.reducer,
};

export const getCheckoutState = createFeatureSelector<CheckoutState>('checkout');

//Cart
export const getCartState = createSelector(
  getCheckoutState,
  (state: CheckoutState) => state.cart
);

export const getCheckoutLoaded = createSelector(
  getCartState,
  fromCart.getLoaded
);
export const getCollectionLoading = createSelector(
  getCartState,
  fromCart.getLoading
);

export const getCartProductIds = createSelector(
  getCartState,
  fromCart.getIds
);

export const getCart = createSelector(
  getCartState,
  fromCart.getCart
);

export const getCartDeliveryTotal = createSelector(
  getCartState,
  fromCart.getDeliveryTotal
);

export const getCartGrossTotal = createSelector(
  getCartState,
  fromCart.getGrossTotal
);

export const getCartItemsTotal = createSelector(
  getCartState,
  fromCart.getItemsTotal
);

export const getCartItems = createSelector(
  getCartState,
  fromCart.getCartItems
);

export const getCartItemCount = createSelector(
  getCartState,
  fromCart.getCartItemCount
);

export const getCartString = createSelector(
  getCartState,
  fromCart.getCartString
);
//Cart End

//Delivery Option
export const getDeliveryOptionState = createSelector(
  getCheckoutState,
  (state: CheckoutState) => state.delivery
);

export const getDeliveryOption = createSelector(
  getDeliveryOptionState,
  fromDeliveryOption.getEntities
);
//Delivery Option End

// // Address Start
// export const getAddressEntitiesState = createSelector(
//   getCheckoutState,
//   state => state.address
// );

// export const {
//   selectIds: getAddressIds,
//   selectEntities: getAddressEntities,
//   selectAll: getAllAddresses,
//   selectTotal: getAddressTotal
// } = fromAddress.adapter.getSelectors(getAddressEntitiesState);

// export const getSelectedAddressId = createSelector(
//   getAddressEntitiesState,
//   fromAddress.getSelectedAddressId
// );

// export const getIsAddressLoading = createSelector(
//   getAddressEntitiesState,
//   fromAddress.getIsLoading
// );

// export const getNewAddressEntities = createSelector(
//   getAddressEntitiesState,
//   fromAddress.getNewAddressEntities
// );

// export const getAddressError = createSelector(
//   getAddressEntitiesState,
//   fromAddress.getError
// );

// export const getSelectedAddress = createSelector(
//   getAddressEntities,
//   getSelectedAddressId,
//   (entities, selectedId) => {
//     return selectedId && entities[selectedId];
//   }
// );

// // Order Start
// export const getOrderEntitiesState = createSelector(
//   getCheckoutState,
//   state => state.order
// );

// export const {
//   selectIds: getOrderIds,
//   selectEntities: getOrderEntities,
//   selectAll: getAllOrders,
//   selectTotal: getOrderTotal
// } = fromOrder.adapter.getSelectors(getOrderEntitiesState);

// export const getSelectedOrderId = createSelector(
//   getOrderEntitiesState,
//   fromOrder.getSelectedOrderId
// );

// export const getIsOrderLoading = createSelector(
//   getOrderEntitiesState,
//   fromOrder.getIsLoading
// );

// export const getNewOrderEntities = createSelector(
//   getOrderEntitiesState,
//   fromOrder.getNewOrderEntities
// );

// export const getOrderError = createSelector(
//   getOrderEntitiesState,
//   fromOrder.getError
// );

// export const getSelectedOrder = createSelector(
//   getOrderEntities,
//   getSelectedOrderId,
//   (entities, selectedId) => {
//     return selectedId && entities[selectedId];
//   }
// );
