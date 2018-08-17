import { Component, OnInit, Input } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import * as StockItemActions from '@store/stock-items/actions/stock-item.actions';
import { StockItem } from '@store/models/stock-item.model';
import * as fromStockItems from '@store/stock-items/reducers';
import { carousel } from '@box/carousel';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: StockItem;

  searchQuery$: Observable<string>;
  stockItems$: Observable<StockItem[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  carousel: any;
  selectedGalleryImage: any;

  constructor(
    private _store: Store<fromStockItems.State>,
    private _route: ActivatedRoute
  ) {
    this.searchQuery$ = _store.pipe(
      select(fromStockItems.getSearchQuery),
      take(1)
    );

    this.carousel = carousel;
    
    this.selectedGalleryImage = this.carousel.gallery.slides[0];
    
    this.stockItems$ = _store.pipe(select(fromStockItems.getSearchResults));
    this.loading$ = _store.pipe(select(fromStockItems.getSearchLoading));
    this.error$ = _store.pipe(select(fromStockItems.getSearchError));
  }

  ngOnInit() {
  }

  onSelectGalleryImage(event) {
    this.selectedGalleryImage = event;
  }

  search(query: any) {
    this._store.dispatch(new StockItemActions.Search(query));
  }
}
