import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[boxWidgetToggle]'
})
export class BoxWidgetToggleDirective
{
    /**
     * Constructor
     *
     * @param {ElementRef} elementRef
     */
    constructor(
        public elementRef: ElementRef
    )
    {
    }
}
