import { Component, OnInit } from '@angular/core';
import { carousel } from '@box/carousel';
import { CheckoutCompletedService } from './checkout-completed.service';

@Component({
  selector: 'checkout-completed',
  templateUrl: './checkout-completed.component.html',
  styleUrls: ['./checkout-completed.component.scss']
})
export class CheckoutCompletedComponent implements OnInit {
  stockItems: any;
  carousel: any;
  constructor(
    private _checkoutCompletedService: CheckoutCompletedService,
  ) { 
    this.carousel = carousel;
    this.stockItems = this._checkoutCompletedService.stockItems;
  }

  ngOnInit() {
  }

}
