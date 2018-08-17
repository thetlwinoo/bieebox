import { StockItemActionTypes, StockItemActionsUnion } from '../actions/stock-item.actions';

export interface State {
  ids: string[];
  loading: boolean;
  error: string;
  query: string;
  total: number;
  limit: number;
  skip: number;
  last: number;
}

const initialState: State = {
  ids: [],
  loading: false,
  error: '',
  query: '',
  total: 0,
  limit: 10,
  skip: 0,
  last: 0
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
          total: 0,
          limit: 10,
          skip: 0,
          last: 0
        };
      }

      return {
        ...state,
        loading: true,
        error: '',
        query
      };
    }

    case StockItemActionTypes.SearchComplete: {
      return {
        ids: action.payload.data.map(stockItem => stockItem.id),
        loading: false,
        error: '',
        query: state.query,
        total: action.payload.total,
        limit: action.payload.limit,
        skip: action.payload.skip,
        last: Math.ceil( action.payload.total/action.payload.limit)
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

export const getTotal = (state: State) => state.total;

export const getLimit = (state: State) => state.limit;

export const getSkip = (state: State) => state.skip;

export const getLast = (state: State) => state.last;
