import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';

@Component({
  selector: 'top-selling',
  templateUrl: './top-selling.component.html',
  styleUrls: ['./top-selling.component.scss']
})
export class TopSellingComponent implements OnInit {
  @Input() stockItems;
  @Input() carousel;
  @Input() searching = false;
  @Input() error = '';

  constructor() { }

  ngOnInit() {
  }
}
