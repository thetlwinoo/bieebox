import { Inject, Injectable, InjectionToken, Optional, ErrorHandler } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { asyncScheduler, empty, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Address } from '@box/models';
import {
    catchError,
    debounceTime,
    map,
    skip,
    switchMap,
    takeUntil,
    exhaustMap,
    tap,
    mergeMap
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
    // UpdateMany,
    // UpdateManySuccess,
    Remove,
    RemoveSuccess,
    AddressError
} from '../actions/address';


@Injectable()
export class AddressEffects {
    @Effect()
    load$: Observable<Action> = this.actions$.pipe(
        ofType<Load>(AddressActionTypes.Load),
        map(action => action.payload),
        switchMap(query => {
            // console.log(res)
            return this.addressService.addresses$(query).pipe(
                map((data: Address[]) => new LoadComplete(data)),
                catchError(err => of(new AddressError(err)))
            );
        })
    );

    @Effect()
    create$: Observable<Action> = this.actions$.pipe(
        ofType<Create>(AddressActionTypes.Create),
        map(action => action.payload),
        mergeMap(query => {
            return this.addressService.addAddress$(query).pipe(
                // map((data: any) => new CreateSuccess(new Address(data))),
                map((response: any) => new CreateSuccess(response)),
                catchError(err => of(new AddressError(err)))
            );
        })
    );

    @Effect()
    update$: Observable<Action> = this.actions$.pipe(
        ofType<Update>(AddressActionTypes.Update),
        map(action => action.payload),
        mergeMap(query => {
            return this.addressService.saveAddress$(query.id, query).pipe(
                map((response: any) => new UpdateSuccess(response)),
                catchError(err => of(new AddressError(err)))
            );
        })
    );

    // @Effect()
    // updateMany$: Observable<Action> = this.actions$.pipe(
    //     ofType<Update>(AddressActionTypes.UpdateMany),
    //     map(action => action.payload),
    //     switchMap(query => {
    //         return this.addressService.saveMany$(query.id, query).pipe(
    //             map((response: any) => new UpdateManySuccess(response)),
    //             catchError(err => of(new AddressError(err)))
    //         );
    //     })
    // );

    @Effect()
    remove$: Observable<Action> = this.actions$.pipe(
        ofType<Remove>(AddressActionTypes.Remove),
        map(action => action.payload),
        switchMap(query => {
            return this.addressService.deleteAddress$(query).pipe(
                map((data: any) => new RemoveSuccess(data)),
                catchError(err => of(new AddressError(err)))
            );
        })
    );

    @Effect({ dispatch: false })
    errorHandler$ = this.actions$.pipe(
        ofType(AddressActionTypes.AddressError),
        tap(() => this.router.navigate(['/pages/home']))
    );

    getNewQuery(query) {
        const newQuery = Object.assign({ person: this.auth.getCurrentUserId() }, query);
        return newQuery;
    }
    
    constructor(
        private actions$: Actions,
        private addressService: AddressService,
        private auth: AuthService,
        private router: Router
    ) { }
}
