import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Address } from '@box/models';
import { AddressActionsUnion, AddressActionTypes } from '../actions/address';
import { AnonymousSubject } from 'rxjs/internal/Subject';


export interface State extends EntityState<Address> {
    data: any[] | null;
    selected: any | null;
}

export const adapter: EntityAdapter<Address> = createEntityAdapter<Address>({
    selectId: (address: Address) => address.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    data: [],
    selected: null
});

export function reducer(
    state = initialState,
    action: AddressActionsUnion
): State {
    switch (action.type) {
        case AddressActionTypes.LoadComplete: {
            console.log('Load Complted', action.payload);

            const index = action.payload.findIndex(item => item.default === true);
            return {
                ...adapter.addMany(action.payload, {
                    ...state,
                    data: action.payload,
                    selected: action.payload[index],
                }),
            };
        }

        case AddressActionTypes.CreateSuccess: {
            // const index = action.payload.default ? action.payload.index : state.data.findIndex(item => item.default === true);
            console.log('crate success', state.data, state.selected)

            const updates: any[] = [];
            state.data.map(address => {
                const data = new Address(address);
                const update = { id: data.id, changes: data };
                updates.push(update);
            });

            // adapter.updateMany(updates, {
            //     ...state
            // });

            return {
                ...adapter.updateMany(updates, {
                    ...state,
                    selected: state.selected
                }),
                // ...adapter.updateOne({ id: state.selected.id, changes: state.data[state.selected.id] }, {
                //     ...state,
                //     selected: state.data[index]
                // })
            };
        }

        case AddressActionTypes.UpdateSuccess: {
            console.log('update success', state.data, state.selected)

            const updates: any[] = [];
            state.data.map(address => {
                const data = new Address(address);
                const update = { id: data.id, changes: data };
                updates.push(update);
            });

            return {
                ...adapter.updateMany(updates, {
                    ...state,
                    selected: state.selected
                }),
            };
        }

        // case AddressActionTypes.UpdateSuccess: {
        //     return {
        //         ...adapter.updateOne({ id: action.payload.id, changes: action.payload }, {
        //             ...state,
        //             selectedAddressId: state.selectedAddressId
        //         }),
        //     };
        // }

        // case AddressActionTypes.UpdateSuccess: {
        //     const updates: any[] = [];
        //     action.payload.updates.data.map(address => {
        //         const data = new Address(address);
        //         const update = { id: data.id, changes: data };
        //         updates.push(update);
        //     });

        //     return {
        //         ...adapter.updateMany(updates, {
        //             ...state,
        //             selectedAddressId: state.selectedAddressId,
        //         }),
        //     };
        // }

        // case AddressActionTypes.CreateSuccess: {

        //     return {
        //         ...adapter.addOne(action.payload, {
        //             ...state,
        //             selectedAddressId: state.selectedAddressId,
        //         }),
        //     };

        //     const updates: any[] = [];
        //     action.payload.updates.data.map(address => {
        //         const data = new Address(address);
        //         const update = { id: data.id, changes: data };
        //         updates.push(update);
        //     });

        //     const newAddress = new Address(action.payload.result);
        //     return {
        //         ...adapter.addOne(newAddress, {
        //             ...state,
        //             selectedAddressId: state.selectedAddressId
        //         }),
        //         // ...adapter.updateMany(updates, {
        //         //     ...state,
        //         //     selectedAddressId: state.selectedAddressId
        //         // })                
        //     };
        // }

        // case AddressActionTypes.RemoveSuccess: {
        //     return {
        //         ...adapter.removeOne(action.payload, {
        //             ...state,
        //             selectedAddressId: state.selectedAddressId,
        //         }),
        //     };
        // }

        default: {
            return state;
        }
    }
}
export const getSelectedId = (state: State) => state.selected.id;

// export const getCreateSuccess = (state: State) => state.createSuccess;