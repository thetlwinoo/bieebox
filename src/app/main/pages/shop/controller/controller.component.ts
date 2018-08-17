import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {
  @Input() total: number;
  @Input() limit: number;
  @Input() skip: number;
  @Output() setPage = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  getCeil(num){
    return Math.ceil(num);
  }
}
