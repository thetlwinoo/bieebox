import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';

@Component({
  selector: 'popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.scss']
})
export class PopularProductsComponent implements OnInit {
  @Input() stockItems;
  @Input() carousel;
  @Input() searching = false;
  @Input() error = '';

  constructor() { }

  ngOnInit() {
  }
}
