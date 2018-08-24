import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';
  import * as fromLoad from './load.reducer';
  import * as fromAddress from './address';
  import * as fromRoot from 'app/reducers';
  
  export interface AddressesState {
    load: fromLoad.State;
    addresses: fromAddress.State;
  }
  
  export interface State extends fromRoot.State {
    addresses: AddressesState;
  }
  
  export const reducers: ActionReducerMap<AddressesState> = {
    load: fromLoad.reducer,
    addresses: fromAddress.reducer
  };

  export const getAddressesState = createFeatureSelector<State, AddressesState>('addresses');

  export const getAddressEntitiesState = createSelector(
    getAddressesState,
    state => state.addresses
  );
  
  export const getSelectedAddressId = createSelector(
    getAddressEntitiesState,
    fromAddress.getSelectedId
  );
  
  export const {
    selectIds: getSelectedIds,
    selectEntities: getAddressEntities,
    selectAll: getAllAddresses,
    selectTotal: getTotalAddresses,
  } = fromAddress.adapter.getSelectors(getAddressEntitiesState);
  
  export const getSelectedAddress = createSelector(
    getAddressEntities,
    getSelectedAddressId,
    (entities, selectedId) => {
      return selectedId && entities[selectedId];
    }
  );
  
  export const getLoadState = createSelector(
    getAddressesState,
    (state: AddressesState) => state.load
  );
  
  export const getLoadAddressIds = createSelector(
    getLoadState,
    fromLoad.getIds
  );
  export const getAddressQuery = createSelector(
    getLoadState,
    fromLoad.getQuery
  );
  export const getAddressLoading = createSelector(
    getLoadState,
    fromLoad.getLoading
  );
  export const getAddressError = createSelector(
    getLoadState,
    fromLoad.getError
  );
  
  export const getLoadResults = createSelector(
    getAddressEntities,
    getLoadAddressIds,
    (addresses, loadIds) => {
      return loadIds.map(id => addresses[id]);
    }
  );
  