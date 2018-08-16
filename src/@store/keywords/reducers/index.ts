import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
} from '@ngrx/store';
import * as fromSearch from './search.reducer';
import * as fromKeywords from './keyword.reducer';
import * as fromRoot from 'app/reducers';

export interface KeywordsState {
    search: fromSearch.State;
    keywords: fromKeywords.State;
}

export interface State extends fromRoot.State {
    keywords: KeywordsState;
}

export const reducers: ActionReducerMap<KeywordsState> = {
    search: fromSearch.reducer,
    keywords: fromKeywords.reducer
};

export const getKeywordsState = createFeatureSelector<State, KeywordsState>('keywords');

export const getKeywordEntitiesState = createSelector(
    getKeywordsState,
    state => state.keywords
  );

export const getSearchState = createSelector(
    getKeywordsState,
    (state: KeywordsState) => state.search
);

export const getSearchQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
export const getSearchLoading = createSelector(
    getSearchState,
    fromSearch.getLoading
);
export const getSearchError = createSelector(
    getSearchState,
    fromSearch.getError
);

export const getSearchResults = createSelector(
    getKeywordEntitiesState,
    fromKeywords.getEntities
);
