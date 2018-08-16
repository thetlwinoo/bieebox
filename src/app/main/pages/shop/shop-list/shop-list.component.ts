import { Component, OnInit, Input } from '@angular/core';
import { StockItemActionsUnion } from '@store/stock-items/actions/stock-item.actions';
import { StockItem } from '@store/models/stock-item.model';

@Component({
  selector: 'shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {
  @Input('carousel') carousel;
  @Input('grid') grid;
  @Input() stockItems: StockItem[];

  numbers;

  constructor() {
    this.numbers = Array(16).fill(5);
  }

  ngOnInit() {
  }

}
