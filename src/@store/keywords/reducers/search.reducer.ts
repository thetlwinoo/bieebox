import { KeywordActionTypes, KeywordActionsUnion } from '../actions/keyword.actions';

export interface State {
  loading: boolean;
  error: string;
  query: string;
}

const initialState: State = {
  loading: false,
  error: '',
  query: '',
};

export function reducer(state = initialState, action: KeywordActionsUnion): State {
  switch (action.type) {
    case KeywordActionTypes.Search: {
      const query = action.payload;

      if (query === '') {
        return {
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

    case KeywordActionTypes.SearchComplete: {
      return {
        loading: false,
        error: '',
        query: state.query,
      };
    }

    case KeywordActionTypes.SearchError: {
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

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;
