import { Component, HostBinding, Input } from '@angular/core';

import { BoxNavigationItem } from '@box/types';

@Component({
    selector   : 'box-nav-vertical-group',
    templateUrl: './group.component.html',
    styleUrls  : ['./group.component.scss']
})
export class BoxNavVerticalGroupComponent
{
    @HostBinding('class')
    classes = 'nav-group nav-item';

    @Input()
    item: BoxNavigationItem;

    /**
     * Constructor
     */
    constructor()
    {
    }

}
