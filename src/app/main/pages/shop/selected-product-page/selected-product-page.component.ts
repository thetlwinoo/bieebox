import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { carousel } from '@box/carousel';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromStockItems from '@store/stock-items/reducers';
import * as StockItemActions from '@store/stock-items/actions/stock-item.actions';

import { Store } from '@ngrx/store';

import { ShopSelectedService } from '../shop-selected.service';

@Component({
  selector: 'app-selected-product-page',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './selected-product-page.component.html',
  styleUrls: ['./selected-product-page.component.scss']
})
export class SelectedProductPageComponent implements OnInit {

  actionsSubscription: Subscription;
  carousel: any;

  stockItems: any; 

  constructor(
    private store: Store<fromStockItems.State>,
    private _shopSelectedService: ShopSelectedService,
    route: ActivatedRoute
  ) {
    this.carousel = carousel;
    this.actionsSubscription = route.params
      .pipe(map(params => new StockItemActions.Select(params.id)))
      .subscribe(store);

    this.stockItems = this._shopSelectedService.stockItems;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
