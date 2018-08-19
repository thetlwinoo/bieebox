import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})
export class PagingComponent implements OnInit {
  @Input() total: number;
  @Input() limit: number;
  @Input() skip: number;
  @Input() last: number;
  @Input() numbers: number[];
  @Output() setPage = new EventEmitter<any>(); 
  constructor() { }

  ngOnInit() {
    
  }

}
