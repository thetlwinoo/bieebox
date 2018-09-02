import { Component, OnInit } from '@angular/core';
import { BoxSidebarService } from '@box/components/sidebar/sidebar.service';
import { AddToCartPosition, AddToCartType, CartService, CartItem, BaseCartItem, LocaleFormat } from 'ng-shopping-cart';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit {

  constructor(
    private _boxSidebarService: BoxSidebarService,
    private cartService: CartService<any>,
  ) { }

  ngOnInit() {
  }

  toggleSidebar(name): void
    {
        this._boxSidebarService.getSidebar(name).toggleOpen();
    }
}
