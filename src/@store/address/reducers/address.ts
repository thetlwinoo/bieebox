import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Address } from '@box/models';
import { AddressActionsUnion, AddressActionTypes } from '../actions/address';


export interface State extends EntityState<Address> {
    selectedAddressId: string | null;
}

export const adapter: EntityAdapter<Address> = createEntityAdapter<Address>({
    selectId: (address: Address) => address.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    selectedAddressId: null,
});

export function reducer(
    state = initialState,
    action: AddressActionsUnion
): State {
    switch (action.type) {
        case AddressActionTypes.LoadComplete: {
            return {
                ...adapter.addMany(action.payload, {
                    ...state,
                    selectedAddressId: state.selectedAddressId,
                }),
            };
        }

        default: {
            return state;
        }
    }
}
export const getSelectedId = (state: State) => state.selectedAddressId;