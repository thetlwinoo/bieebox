import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';

import { StockItemsService } from '@store/stock-items/services/stock-item.service';
import * as StockItemActions from '@store/stock-items/actions/stock-item.actions';
import * as fromStockItems from '@store/stock-items/reducers';

@Injectable()
export class StockItemExistsGuard {
// implements CanActivate {
  constructor(
    private store: Store<fromStockItems.State>,
    private stockItems: StockItemsService,
    private router: Router
  ) {}

//   waitForCollectionToLoad(): Observable<boolean> {
//     return this.store.pipe(
//       select(fromStockItems.getCollectionLoaded),
//       filter(loaded => loaded),
//       take(1)
//     );
//   }

//   hasStockItemInStore(id: string): Observable<boolean> {
//     return this.store.pipe(
//       select(fromStockItems.getStockItemEntities),
//       map(entities => !!entities[id]),
//       take(1)
//     );
//   }

//   hasStockItemInApi(id: string): Observable<boolean> {
//     return this.stockItems.retrieveStockItem(id).pipe(
//       map(stockItemEntity => new StockItemActions.Load(stockItemEntity)),
//       tap((action: StockItemActions.Load) => this.store.dispatch(action)),
//       map(stockItem => !!stockItem),
//       catchError(() => {
//         this.router.navigate(['/404']);
//         return of(false);
//       })
//     );
//   }

//   hasStockItem(id: string): Observable<boolean> {
//     return this.hasStockItemInStore(id).pipe(
//       switchMap(inStore => {
//         if (inStore) {
//           return of(inStore);
//         }

//         return this.hasStockItemInApi(id);
//       })
//     );
//   }

//   canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
//     return this.waitForCollectionToLoad().pipe(
//       switchMap(() => this.hasStockItem(route.params['id']))
//     );
//   }
}
