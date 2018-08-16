import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class BoxTreeViewComponent implements OnInit {
  @ViewChild('treeview') treeview: ElementRef;
  @Input()
  navigation: any;

  constructor() {
  }

  ngOnInit() {
  }

}
