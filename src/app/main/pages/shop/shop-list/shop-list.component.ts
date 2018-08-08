import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {
  @Input('carousel') carousel;
  @Input('grid') grid;

  numbers;

  constructor() { 
    this.numbers = Array(16).fill(5);
  }

  ngOnInit() {
  }

}
