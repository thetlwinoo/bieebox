import { Component, HostBinding, Input } from '@angular/core';

import { BoxNavigationItem } from '@box/types';

@Component({
    selector   : 'box-nav-vertical-item',
    templateUrl: './item.component.html',
    styleUrls  : ['./item.component.scss']
})
export class BoxNavVerticalItemComponent
{
    @HostBinding('class')
    classes = 'nav-item';

    @Input()
    item: BoxNavigationItem;

    /**
     * Constructor
     */
    constructor()
    {
    }
}
