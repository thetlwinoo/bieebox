import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { asyncScheduler, empty, Observable, of } from 'rxjs';
import {
    catchError,
    debounceTime,
    map,
    skip,
    switchMap,
    takeUntil,
} from 'rxjs/operators';

import { AddressService } from '../services/address.service';
import { AuthService } from '@box/services/auth.service';
import {
    AddressActionTypes,
    Load,
    LoadComplete,
    Create,
    CreateSuccess,
    Update,
    UpdateSuccess,
    Remove,
    RemoveSuccess,
    SetDefault,
    SetDefaultSuccess
} from '../actions/address';

@Injectable()
export class AddressEffects {
    @Effect()
    load$: Observable<Action> = this.actions$.pipe(
        ofType<Load>(AddressActionTypes.Load),
        map(action => action.payload),
        switchMap(query => {
            return this.addressService.addresses$(this.getNewQuery(query)).pipe(
                map((data: any) => new LoadComplete(data)),
                catchError(err => of(err))
            );
        })
    );

    @Effect()
    create$: Observable<Action> = this.actions$.pipe(
        ofType<Create>(AddressActionTypes.Create),
        map(action => action.payload),
        switchMap(query => {
            return this.addressService.addAddress$(query).pipe(
                map((data: any) => new CreateSuccess(data)),
                catchError(err => of(err))
            );
        })
    );

    @Effect()
    update$: Observable<Action> = this.actions$.pipe(
        ofType<Update>(AddressActionTypes.Update),
        map(action => action.payload),
        switchMap(query => {
            return this.addressService.saveAddress$(query.id, query).pipe(
                map((data: any) => new UpdateSuccess(data)),
                catchError(err => of(err))
            );
        })
    );

    @Effect()
    remove$: Observable<Action> = this.actions$.pipe(
        ofType<Remove>(AddressActionTypes.Remove),
        map(action => action.payload),
        switchMap(query => {
            return this.addressService.deleteAddress$(query).pipe(
                map((data: any) => new RemoveSuccess(data)),
                catchError(err => of(err))
            );
        })
    );

    @Effect()
    setDefault$: Observable<Action> = this.actions$.pipe(
        ofType<SetDefault>(AddressActionTypes.SetDefault),
        map(action => action.payload),
        switchMap(query => {
            return this.addressService.addresses$(query).pipe(
                map((data: any) => new SetDefaultSuccess(data)),
                catchError(err => of(err))
            );
        })
    );

    getNewQuery(query) {        
        return this.auth.getCurrentAccount().then(user => {      
            this.addressService.onUserChanged.next(user);     
            const newQuery = Object.assign({ person: user.id },query);
             return newQuery;
        });
    }
    constructor(
        private actions$: Actions,
        private addressService: AddressService,
        private auth: AuthService,
    ) { }
}
