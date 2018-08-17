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
  numbers: number[];
  grid: boolean = true;
  key: string;
  last: number;

  searchQuery$: Observable<string>;
  total$: Observable<number>;
  limit$: Observable<number>;
  skip$: Observable<number>;
  last$: Observable<number>;
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

    this.searchQuery$ = store.pipe(
      select(fromStockItems.getSearchQuery),
      take(1)
    );

    this.categories = this._shopService.categories;
    this.servicesandpromotions = this._shopService.servicesandpromotions;
    this.condition = this._shopService.condition;
    this.tags = this._shopService.tags;
    this.stockItems$ = store.pipe(select(fromStockItems.getSearchResults));
    this.total$ = store.pipe(select(fromStockItems.getSearchTotal));
    this.limit$ = store.pipe(select(fromStockItems.getSearchLimit));
    this.skip$ = store.pipe(select(fromStockItems.getSearchSkip));
    this.last$ = store.pipe(select(fromStockItems.getSearchLast));
    this.loading$ = store.pipe(select(fromStockItems.getSearchLoading));
    this.error$ = store.pipe(select(fromStockItems.getSearchError));

    this.last$.subscribe(last => {      
      this.skip$.subscribe(skip => {
        this.numbers = [];
        if (last > 5 && skip < 5)
          switch (skip) {
            case 0:
            case 1:
              this.numbers = [3, 4, 5];
              break;
            case 2:
            case 3:
              this.numbers = [3, 4, 5, 6];
              break;
            case 4:
              this.numbers = [3, 4, 5, 6, 7];
              break;
            default:
              this.numbers = [3, 4, 5];
              break;
          }
        else if (last > 5 && skip + 3 <= last) {
          this.numbers = [];
          for (var i = skip - 2; i <= skip + 2; i++) {
            this.numbers.push(i + 1);
          }
        }
      });

      console.log(this.numbers)
    })
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
      this.key = _key;

      this.search({
        $limit: 20,
        $skip: 0,
        key: _key
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

  onSetPage(event) {
    this.search({
      $limit: 20,
      $skip: event,
      key: this.key
    });
  }
}
