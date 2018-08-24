import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Address } from '@box/models';

@Component({
  selector: 'view-checkout-page',
  templateUrl: './view-checkout-page.component.html',
  styleUrls: ['./view-checkout-page.component.scss']
})
export class ViewCheckoutPageComponent implements OnInit {
  @Output() create = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  @Output() setdefault = new EventEmitter<any>();

  @Input() addresses: any;
  @Input() loading: any;
  @Input() error: any;
  @Input() selected: any;

  constructor(

  ) { }

  ngOnInit() {

  }

}
