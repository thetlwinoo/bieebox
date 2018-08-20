import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';

import { StockItemsService } from '../services/stock-item.service';
import * as StockItemActions from '../actions/stock-item.actions';
import * as fromStockItems from '../reducers';
import { StockItem } from '@box/models';

@Injectable()
export class StockItemExistsGuard implements CanActivate {
    constructor(
        private store: Store<fromStockItems.State>,
        private stockItemsService: StockItemsService,
        private router: Router
    ) {
    }

    hasStockItemInStore(id: string): Observable<boolean> {
        return this.store.pipe(
            select(fromStockItems.getStockItemEntities),
            map(entities => !!entities[id]),
            take(1)
        );
    }

    hasStockItemInApi(id: string): Observable<boolean> {
        console.log('in api',id)
        return this.stockItemsService.stockItem$(id).pipe(
            map(stockItemEntity => new StockItemActions.Load(stockItemEntity)),
            tap((action: StockItemActions.Load) => this.store.dispatch(action)),
            map(stockItem => !!stockItem),
            catchError(() => {
                this.router.navigate(['/404']);
                return of(false);
            })
        );
    }

    hasStockItem(id: string): Observable<boolean> {
        return this.hasStockItemInStore(id).pipe(
            switchMap(inStore => {
                if (inStore) {
                    console.log('in store',id)
                    return of(inStore);
                }

                return this.hasStockItemInApi(id);
            })
        );
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.hasStockItem(route.params['id']);
    }
}
