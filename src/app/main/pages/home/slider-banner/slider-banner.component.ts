import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'slider-banner',
  templateUrl: './slider-banner.component.html',
  styleUrls: ['./slider-banner.component.scss']
})
export class SliderBannerComponent implements OnInit {
  @Input('carousel') carousel;
  
  constructor() { }

  ngOnInit() {
  }

}
