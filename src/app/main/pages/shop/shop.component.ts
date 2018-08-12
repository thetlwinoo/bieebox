import { Component, OnInit } from '@angular/core';
import { carousel } from '@box/carousel';
import { BoxSidebarService } from '@box/components/sidebar/sidebar.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  carousel: any;
  numbers;
  grid: boolean = true;

  constructor(
    private _boxSidebarService: BoxSidebarService
  ) {
    this.carousel = carousel;
    this.numbers = Array(20).fill(5);
  }

  ngOnInit() {
  }

  onToggleGrid(event){
    this.grid = event;
  }

  toggleSidebar(name): void
    {
        this._boxSidebarService.getSidebar(name).toggleOpen();
    }
}
