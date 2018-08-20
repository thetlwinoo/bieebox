import { Component, OnInit, Input } from '@angular/core';
import { StockItemActionsUnion } from '@store/stock-items/actions/stock-item.actions';
import { StockItem } from '@box/models';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input('carousel') carousel;
  @Input('grid') grid;
  @Input() stockItems: StockItem[];
  @Input() total: number;
  @Input() limit: number;
  @Input() skip: number;

  numbers;

  constructor() {
    this.numbers = Array(16).fill(5);
  }

  ngOnInit() {
  }

}
