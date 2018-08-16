import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';

@Component({
  selector: 'product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {
  @Input() carousel;
  @Input() categories;
  @ViewChild('owlProductCategory') owlElement: OwlCarousel;

  bundles: any[] = [];
  
  constructor() {
  }

  ngOnInit() {    
    if (this.categories.length >= 8) {
      let _cag = this.categories.slice(0,20);
      for (let i = 1; i <= 10; i++) {
        let _category = [];
        _category.push(_cag[(i * 2) - 2]);
        _category.push(_cag[(i * 2) - 1]);
        this.bundles.push(_category);
      }
    }
  }

  onPrevClick(event) {
    this.owlElement.trigger('prev.owl.carousel');
  }

  onNextClick(event) {
    this.owlElement.trigger('next.owl.carousel');
  }
}
