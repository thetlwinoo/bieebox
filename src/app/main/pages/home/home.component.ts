import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { carousel } from '@box/carousel';
import { Router, NavigationEnd } from '@angular/router';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import * as StockItemActions from '@store/stock-items/actions/stock-item.actions';
import { StockItem } from '@box/models';
import * as fromStockItems from '@store/stock-items/reducers';
import { boxAnimations } from '@box/animations';
import { HomeService } from './home.service';

import { SnackBarService } from '@box/services/snackbar.service';
// import { ToastOptions, ToastyService, ToastyConfig } from "ng2-toasty";
import { BoxInMemoryService } from '@box/services/in-memory.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations   : boxAnimations  
})
export class HomeComponent implements OnInit {
  searchQuery$: Observable<string>;
  stockItems$: Observable<StockItem[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  stockItems: any;
  categories: any;
  bannerCategories: any;
  carousel: any;
  brands: any;
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
    private _homeService: HomeService,
    private snack: SnackBarService,
    private _inMemoryService: BoxInMemoryService
    // private toastyService: ToastyService,
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
    this.categories = this._inMemoryService.categories;
    this.bannerCategories = this._inMemoryService.bannerCategories;
    this.brands = this._inMemoryService.brands;
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

  // test(){
  //   const toastOption: ToastOptions = {
  //     title: "Adding Product to Cart",
  //     msg: "Product Adding to the cart",
  //     showClose: true,
  //     timeout: 1000,
  //     theme: "material"
  // };
  // this.toastyService.wait(toastOption);

  // setTimeout(() => {

  // }, 500);
  // }  

  sendMessage(message: string): void {
    this.snack.sendMessage(message);
  }

  clearMessage(): void {
    this.snack.clearMessage();
  }
}
