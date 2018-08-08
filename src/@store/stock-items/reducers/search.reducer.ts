import { StockItemActionTypes, StockItemActionsUnion } from '../actions/stock-item.actions';

export interface State {
  ids: string[];
  loading: boolean;
  error: string;
  query: string;
}

const initialState: State = {
  ids: [],
  loading: false,
  error: '',
  query: '',
};

export function reducer(state = initialState, action: StockItemActionsUnion): State {
  switch (action.type) {
    case StockItemActionTypes.Search: {
      const query = action.payload;

      if (query === '') {
        return {
          ids: [],
          loading: false,
          error: '',
          query,
        };
      }

      return {
        ...state,
        loading: true,
        error: '',
        query,
      };
    }

    case StockItemActionTypes.SearchComplete: {
      return {
        ids: action.payload.map(stockItem => stockItem.id),
        loading: false,
        error: '',
        query: state.query,
      };
    }

    case StockItemActionTypes.SearchError: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;
