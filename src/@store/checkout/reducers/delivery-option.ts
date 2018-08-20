import { createSelector } from '@ngrx/store';
import { DeliveryOption } from '@box/models';
import * as cart from '../actions/cart';

export interface State {
  loaded: boolean;
  loading: boolean;
  entities: DeliveryOption[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  entities: [],
};


export function reducer(
  state = initialState,
  action: cart.Actions
): State {
  switch (action.type) {
    case cart.LOAD_DELIVERY_OPTION: {
      return {
        ...state,
        loading: true,
      };
    }

    case cart.LOAD_DELIVERY_OPTION_SUCCESS: {
      return {
        loaded: true,
        loading: false,
        entities: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
export const getEntities = (state: State) => state.entities;
