import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
} from '@ngrx/store';
import * as fromSearch from './search.reducer';
import * as fromStockItems from './stock-item.reducer';
import * as fromRoot from 'app/reducers';

export interface StockItemsState {
    search: fromSearch.State;
    stockItems: fromStockItems.State;
}

export interface State extends fromRoot.State {
    stockItems: StockItemsState;
}

export const reducers: ActionReducerMap<StockItemsState> = {
    search: fromSearch.reducer,
    stockItems: fromStockItems.reducer
};

export const getStockItemsState = createFeatureSelector<State, StockItemsState>('stockItems');

export const getStockItemEntitiesState = createSelector(
    getStockItemsState,
    state => state.stockItems
);

export const getSelectedStockItemId = createSelector(
    getStockItemEntitiesState,
    fromStockItems.getSelectedId
);

export const {
    selectIds: getStockItemIds,
    selectEntities: getStockItemEntities,
    selectAll: getAllStockItems,
    selectTotal: getTotalStockItems,
} = fromStockItems.adapter.getSelectors(getStockItemEntitiesState);

export const getSelectedStockItem = createSelector(
    getStockItemEntities,
    getSelectedStockItemId,
    (entities, selectedId) => {
        return selectedId && entities[selectedId];
    }
);

export const getSearchState = createSelector(
    getStockItemsState,
    (state: StockItemsState) => state.search
);

export const getSearchStockItemIds = createSelector(
    getSearchState,
    fromSearch.getIds
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
    getStockItemEntities,
    getSearchStockItemIds,
    (stockItems, searchIds) => {
        return searchIds.map(id => stockItems[id]);
    }
);
