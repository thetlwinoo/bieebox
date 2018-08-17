import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StockItem } from '@store/models/stock-item.model';
import * as fromStockItem from '@store/stock-items/reducers';

@Component({
  selector: 'selected-product',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './selected-product.component.html',
  styleUrls: ['./selected-product.component.scss']
})
export class SelectedProductComponent {
  product$: Observable<StockItem>;
  constructor(private store: Store<fromStockItem.State>) {
    this.product$ = store.pipe(select(fromStockItem.getSelectedStockItem)) as Observable<StockItem>;
  }

}
