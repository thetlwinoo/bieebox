import { Component, OnInit } from '@angular/core';
import { boxAnimations } from '@box/animations';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  animations   : boxAnimations  
})
export class ShopComponent implements OnInit {   
  constructor(
    
  ) {    
  }

  ngOnInit() {
   
  }
}
