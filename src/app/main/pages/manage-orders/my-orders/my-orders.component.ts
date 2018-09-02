import { Component, OnInit } from '@angular/core';
import { MyOrdersService } from './my-orders.service';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  orders:any; 
  step = 0;
  constructor(
    private myOrdersService: MyOrdersService
  ) {
    myOrdersService.onOrdersChanged.subscribe(orders=>{
      console.log(orders)
      this.orders = orders;
    });
   }

  ngOnInit() {
  }

}
