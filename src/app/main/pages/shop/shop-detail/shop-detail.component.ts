import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromStockItem from '@store/stock-items/reducers';
import * as StockItemActions from '@store/stock-items/actions/stock-item.actions';

@Component({
  selector: 'app-shop-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss']
})
export class ShopDetailComponent implements OnInit, OnDestroy {
  actionsSubscription: Subscription;
  constructor(
    store: Store<fromStockItem.State>,
    route: ActivatedRoute
  ) {
    this.actionsSubscription = route.params
      .pipe(map(params => new StockItemActions.Select(params.id)))
      .subscribe(store);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
