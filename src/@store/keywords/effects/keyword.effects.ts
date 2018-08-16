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

import { KeywordsService } from '../services/keywords.service';
import {
    KeywordActionTypes,
    Search,
    SearchComplete,
    SearchError,
} from '../actions/keyword.actions';
import { Scheduler } from 'rxjs/internal/Scheduler';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>(
    'Search Scheduler'
);

@Injectable()
export class KeywordEffects {
    @Effect()
    search$: Observable<Action> = this.actions$.pipe(
        ofType<Search>(KeywordActionTypes.Search),
        debounceTime(this.debounce || 300, this.scheduler || asyncScheduler),
        map(action => action.payload),
        switchMap(query => {
            if (query === '') {
                return of(new SearchComplete([]));
            }

            const nextSearch$ = this.actions$.pipe(
                ofType(KeywordActionTypes.Search),
                skip(1)
            );

            return this.keywordsService.keywords$({ key: query }).pipe(
                takeUntil(nextSearch$),
                map((keywords: String[]) => new SearchComplete(keywords)),
                catchError(err => of(new SearchError(err)))
            );
        })
    );

    constructor(
        private actions$: Actions,
        private keywordsService: KeywordsService,
        @Optional()
        @Inject(SEARCH_DEBOUNCE)
        private debounce: number,
        @Optional()
        @Inject(SEARCH_SCHEDULER)
        private scheduler: Scheduler
    ) { }
}
