import { Component, Input } from '@angular/core';

@Component({
    selector: 'brand',
    templateUrl: './brand.component.html',
    styleUrls: ['./brand.component.scss']
})
export class BrandComponent {
    @Input() carousel: any;
    /**
     * Constructor
     */
    constructor() {
    }
}
