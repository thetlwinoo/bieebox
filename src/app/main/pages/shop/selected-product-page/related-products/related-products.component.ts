import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';

@Component({
  selector: 'related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss']
})
export class RelatedProductsComponent implements OnInit {
  @Input() relatedItems;
  @Input() carousel;
  @Input() searching = false;
  @Input() error = '';
  @ViewChild('owlRelatedProducts') owlElement: OwlCarousel;

  constructor() { }

  ngOnInit() {
  }

  onPrevClick(event) {
    this.owlElement.trigger('prev.owl.carousel');
  }

  onNextClick(event) {
    this.owlElement.trigger('next.owl.carousel');
  }
}
