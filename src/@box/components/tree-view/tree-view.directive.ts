import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[boxTreeView]'
})
export class BoxTreeViewDirective {
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
