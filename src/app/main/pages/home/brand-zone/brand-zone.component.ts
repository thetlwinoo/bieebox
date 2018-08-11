import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'brand-zone',
  templateUrl: './brand-zone.component.html',
  styleUrls: ['./brand-zone.component.scss']
})
export class BrandZoneComponent implements OnInit {
  @Input() brands;
  constructor() { }

  ngOnInit() {
  }

}
