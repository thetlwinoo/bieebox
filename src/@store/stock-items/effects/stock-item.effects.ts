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

import { StockItemsService } from '../services/stock-item.service';
import {
    StockItemActionTypes,
    Search,
    SearchComplete,
    SearchError,
} from '../actions/stock-item.actions';
import { StockItem } from '@store/models/stock-item.model';
import { Scheduler } from 'rxjs/internal/Scheduler';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>(
    'Search Scheduler'
);

@Injectable()
export class StockItemEffects {
    @Effect()
    search$: Observable<Action> = this.actions$.pipe(
        ofType<Search>(StockItemActionTypes.Search),
        debounceTime(this.debounce || 300, this.scheduler || asyncScheduler),
        map(action => action.payload),
        switchMap(query => {
            if (query === '') {
                return empty();
            }

            const nextSearch$ = this.actions$.pipe(
                ofType(StockItemActionTypes.Search),
                skip(1)
            );

            return this.stockItemService.stockItems$(query).pipe(
                takeUntil(nextSearch$),
                map((paged: any) => new SearchComplete(paged)),
                catchError(err => of(new SearchError(err)))
            );
        })
    );

    constructor(
        private actions$: Actions,
        private stockItemService: StockItemsService,
        @Optional()
        @Inject(SEARCH_DEBOUNCE)
        private debounce: number,
        @Optional()
        @Inject(SEARCH_SCHEDULER)
        private scheduler: Scheduler
    ) { }
}
