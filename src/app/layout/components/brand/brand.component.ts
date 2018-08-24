import { Component, Input } from '@angular/core';
import { carousel } from '@box/carousel';

@Component({
    selector: 'brand',
    templateUrl: './brand.component.html',
    styleUrls: ['./brand.component.scss']
})
export class BrandComponent {
    carousel: any;    
    /**
     * Constructor
     */
    constructor() {
        this.carousel = carousel;
    }
}
