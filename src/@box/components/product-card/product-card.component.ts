import { AfterContentInit, Component, ViewEncapsulation, Input } from '@angular/core';
import { ProductCardDirective } from './product-card.directive';

@Component({
    selector: 'product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ProductCardComponent implements AfterContentInit {
    @Input() stockItem;

    title;
    constructor(
    ) {
        this.title = "Small plates, salads & sandwiches in an intimate setting with 12 indoor seats plus patio seating.";
    }

    ngAfterContentInit(): void {

    }
}
