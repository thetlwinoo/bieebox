import { Component, OnInit } from '@angular/core';
import { carousel } from '@box/carousel';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss']
})
export class ShopDetailComponent implements OnInit {
  carousel: any;
  selectedGalleryImage: any;

  constructor() { 
    this.carousel = carousel;
    this.selectedGalleryImage = this.carousel.gallery.slides[0];
  }

  ngOnInit() {
  }
  
  onSelectGalleryImage(event){
    this.selectedGalleryImage = event;
  }
}
