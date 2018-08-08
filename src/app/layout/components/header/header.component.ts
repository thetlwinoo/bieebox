import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnDestroy {
    route: any;
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _router: Router
    ) {
        this._unsubscribeAll = new Subject();
        this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.route = (event.url == '/' || event.url == '/pages/home') ? true : false;
            }
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
