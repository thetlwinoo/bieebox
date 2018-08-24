import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'slider-banner',
  templateUrl: './slider-banner.component.html',
  styleUrls: ['./slider-banner.component.scss']
})
export class SliderBannerComponent implements OnInit {
  @Input('carousel') carousel;
  @Input('bannerCategories') bannerCategories;
  @ViewChild('boxcag') boxcag: ElementRef;

  selectedCategory;
  constructor() { }

  ngOnInit() {
  }

  // mouseEnter(event){
  //   this.selectedCategory = event;
  // }

  // mouseLeave(event){
  //   this.selectedCategory = {};
  // }
}
