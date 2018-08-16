import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { KeywordActionsUnion, KeywordActionTypes } from '../actions/keyword.actions';

export interface State {
    entities: any[];
}

const initialState: State = {
    entities: []
};

export function reducer(
    state = initialState,
    action: KeywordActionsUnion
): State {
    switch (action.type) {
        case KeywordActionTypes.SearchComplete: {
            return {
                entities: action.payload || []
            };
        }

        default: {
            return state;
        }
    }
}

export const getEntities = (state: State) => state.entities;
