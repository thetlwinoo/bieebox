import { Component, OnInit } from '@angular/core';
import { BoxSidebarService } from '@box/components/sidebar/sidebar.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  step = 0;

  constructor(private _boxSidebarService: BoxSidebarService) { }

  ngOnInit() {
  }

  toggleSidebar(name): void {
    this._boxSidebarService.getSidebar(name).toggleOpen();
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
