import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[boxProductCard]'
})
export class ProductCardDirective {
    /**
     * Constructor
     *
     * @param {ElementRef} elementRef
     */
    constructor(
        public elementRef: ElementRef
    ) {
    }
}
