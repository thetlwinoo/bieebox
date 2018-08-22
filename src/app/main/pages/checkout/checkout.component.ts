import { Component, OnInit } from '@angular/core';
import { BoxSidebarService } from '@box/components/sidebar/sidebar.service';
import { boxAnimations } from '@box/animations';
import { carousel } from '@box/carousel';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations   : boxAnimations  
})
export class CheckoutComponent implements OnInit {
  carousel: any;
  step = 0;

  constructor(private _boxSidebarService: BoxSidebarService) {
    this.carousel = carousel;
   }

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
