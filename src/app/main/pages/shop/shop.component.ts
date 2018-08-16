import { Component, OnInit } from '@angular/core';
import { carousel } from '@box/carousel';
import { BoxSidebarService } from '@box/components/sidebar/sidebar.service';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import * as StockItemActions from '@store/stock-items/actions/stock-item.actions';
import { StockItem } from '@store/models/stock-item.model';
import * as fromStockItems from '@store/stock-items/reducers';

import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  carousel: any;
  servicesandpromotions: any;
  condition: any;
  tags: any;
  numbers;
  grid: boolean = true;

  searchQuery$: Observable<string>;
  stockItems$: Observable<StockItem[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  categories: any;

  keysearch: Observable<string>;
  token: Observable<string>;

  constructor(
    private store: Store<fromStockItems.State>,
    private _boxSidebarService: BoxSidebarService,
    private _shopService: ShopService,
    private _route: ActivatedRoute
  ) {
    this.carousel = carousel;
    this.numbers = Array(20).fill(5);

    this.searchQuery$ = store.pipe(
      select(fromStockItems.getSearchQuery),
      take(1)
    );

    this.categories = this._shopService.categories;
    this.servicesandpromotions = this._shopService.servicesandpromotions;
    this.condition = this._shopService.condition;
    this.tags = this._shopService.tags;
    this.stockItems$ = store.pipe(select(fromStockItems.getSearchResults));
    this.loading$ = store.pipe(select(fromStockItems.getSearchLoading));
    this.error$ = store.pipe(select(fromStockItems.getSearchError));
  }

  ngOnInit() {
    this.keysearch = this._route
      .queryParamMap
      .pipe(map(params => params.get('search') || 'None'));

    // Capture the fragment if available
    this.token = this._route
      .fragment
      .pipe(map(fragment => fragment || 'None'));

    this.keysearch.subscribe(key => {
      const _key = (key === 'None') ? '' : key;
      console.log('Key',_key)
      this.search({
        $limit: 20,
        $skip: 0,
        query: {
          key: _key
        }
      });
    });
  }

  onToggleGrid(event) {
    this.grid = event;
  }

  toggleSidebar(name): void {
    this._boxSidebarService.getSidebar(name).toggleOpen();
  }

  search(query: any) {
    this.store.dispatch(new StockItemActions.Search(query));
  }
}
