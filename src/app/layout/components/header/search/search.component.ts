import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'box-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() url: String;
  @Input() query = '';
  @Input() searching = false;
  @Input() error = '';
  @Input() keywords: any;
  @Input() defaultKeywords: any;
  @Output() search = new EventEmitter<string>();
  @Output() summit = new EventEmitter<any>();
  @ViewChild('boxsearch') boxsearch: ElementRef;

  onfocus: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onFocus(event) {
    this.onfocus = true;
  }

  onFocusOut(event) {
    setTimeout(() => {
      this.onfocus = false;
    }, 150);

  }

  onClick(event, keyword) {
    event.preventDefault();
    const search = this.boxsearch.nativeElement;
    search.value = keyword;
  }

  
}
