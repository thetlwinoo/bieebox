import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { carousel } from '@box/carousel';
import { Router, NavigationEnd } from '@angular/router';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import * as StockItemActions from '@store/stock-items/actions/stock-item.actions';
import { StockItem } from '@store/models/stock-item.model';
import * as fromStockItems from '@store/stock-items/reducers';

import { HomeService } from './home.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchQuery$: Observable<string>;
  stockItems$: Observable<StockItem[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;
  
  stockItems: any;
  categories: any;
  carousel: any;
  tabs: any[] = [
    { title: 'New Arrivals' },
    { title: 'Featured' },
    { title: 'Top Rated' }
  ];
  selectedTab: any;

  tiles: Tile[] = [
    { text: 'One', cols: 4, rows: 2, color: 'lightblue' },
    { text: 'Two', cols: 2, rows: 1, color: 'lightgreen' },
    { text: 'Three', cols: 2, rows: 1, color: 'lightpink' }
  ];
  
  constructor(
    private store: Store<fromStockItems.State>,
    private _homeService:HomeService,
  ) {
    this.carousel = carousel;    
    // this.searchQuery$ = store.pipe(
    //   select(fromStockItems.getSearchQuery),
    //   take(1)
    // );

    // this.stockItems$ = store.pipe(select(fromStockItems.getSearchResults));
    // this.loading$ = store.pipe(select(fromStockItems.getSearchLoading));
    // this.error$ = store.pipe(select(fromStockItems.getSearchError));

    // this.search({
    //   $limit: 10
    // });
    this.stockItems = this._homeService.stockItems;
    this.categories = this._homeService.categories;
  }

  ngOnInit() {
  }

  onSelectedProductTab(event) {
    this.selectedTab = event;
    return false;
  }

  search(query: any) {
    this.store.dispatch(new StockItemActions.Search(query));
  }
}
