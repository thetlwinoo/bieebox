import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'daily-discover',
  templateUrl: './daily-discover.component.html',
  styleUrls: ['./daily-discover.component.scss']
})
export class DailyDiscoverComponent implements OnInit {  
  @Input() stockItems;
  @Input() searching = false;
  @Input() error = '';

  numbers;

  constructor() { 
    this.numbers = Array(18).fill(5);
  }

  ngOnInit() {
  }

}
