import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'best-selling',
  templateUrl: './best-selling.component.html',
  styleUrls: ['./best-selling.component.scss']
})
export class BestSellingComponent implements OnInit {
  @Input() stockItems;
  @Input() carousel;
  @Input() searching = false;
  @Input() error = '';
  bundles;

  // get bundles1() {
  //   let _bundles = [];
  //   if (this.stockItems.length >= 8) {      
  //     for (let i = 1; i <= 4; i++) {
  //       let _stockItem = [];
  //       _stockItem.push(this.stockItems[(i * 2) - 2]);
  //       _stockItem.push(this.stockItems[(i * 2) - 1]);
  //       _bundles.push(_stockItem);
  //     }
  //   }
  //   return _bundles;
  // }

  constructor() { }

  ngOnInit() {
    this.bundles = [
      {
        images: [
          { img: 'assets/devita/img/product/best-selling-1.jpg' },
          { img: 'assets/devita/img/product/best-selling-4.jpg' }
        ],
        slice: { start: 0, count: 2 }
      },
      {
        images: [
          { img: 'assets/devita/img/product/best-selling-2.jpg' },
          { img: 'assets/devita/img/product/best-selling-5.jpg' }
        ],
        slice: { start: 2, count: 2 }
      },
      {
        images: [
          { img: 'assets/devita/img/product/best-selling-3.jpg' },
          { img: 'assets/devita/img/product/best-selling-6.jpg' }
        ],
        slice: { start: 4, count: 2 }
      },
      {
        images: [
          { img: 'assets/devita/img/product/best-selling-2.jpg' },
          { img: 'assets/devita/img/product/best-selling-5.jpg' }
        ],
        slice: { start: 4, count: 2 }
      }

    ];
  }

}
