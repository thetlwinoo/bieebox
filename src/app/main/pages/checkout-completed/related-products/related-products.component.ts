import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';

@Component({
  selector: 'related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss']
})
export class RelatedProductsComponent implements OnInit {

  @Input() stockItems;
  @Input() carousel;
  @Input() searching = false;
  @Input() error = '';
  @ViewChild('owlRelatedProducts') owlElement: OwlCarousel;

  constructor() { }

  ngOnInit() {
  }

  onPrevClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.owlElement.trigger('prev.owl.carousel');
    return false;
  }

  onNextClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.owlElement.trigger('next.owl.carousel');
    return false;
  }

}
