import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { StockItem } from '@store/models/stock-item.model';
import { StockItemActionsUnion, StockItemActionTypes } from '../actions/stock-item.actions';

export interface State extends EntityState<StockItem> {
    selectedStockItemId: string | null;
}

export const adapter: EntityAdapter<StockItem> = createEntityAdapter<StockItem>({
    selectId: (stockItem: StockItem) => stockItem.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    selectedStockItemId: null,
});

export function reducer(
    state = initialState,
    action: StockItemActionsUnion
): State {
    switch (action.type) {
        case StockItemActionTypes.SearchComplete: {
            return adapter.addMany(action.payload.data, {
                ...state,
                selectedStockItemId: state.selectedStockItemId,
            });
        }

        case StockItemActionTypes.Load: {
            return adapter.addOne(action.payload, {
                ...state,
                selectedStockItemId: state.selectedStockItemId,
            });
        }

        case StockItemActionTypes.Select: {
            return {
                ...state,
                selectedStockItemId: action.payload,
            };
        }

        default: {
            return state;
        }
    }
}

export const getSelectedId = (state: State) => state.selectedStockItemId;
