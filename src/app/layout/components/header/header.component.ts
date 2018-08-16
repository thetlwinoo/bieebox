import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRouteSnapshot, CanActivate , NavigationExtras} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import * as KeywordActions from '@store/keywords/actions/keyword.actions';
import * as fromKeywords from '@store/keywords/reducers';

import { HeaderService } from './header.service';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnDestroy {
    currentUrl: any;
    defaultKeywords: any;

    searchQuery$: Observable<string>;
    keywords$: Observable<String[]>;
    loading$: Observable<boolean>;
    error$: Observable<string>;

    private _unsubscribeAll: Subject<any>;

    constructor(
        private store: Store<fromKeywords.State>,
        private _headerService: HeaderService,
        private _router: Router
    ) {

        this.searchQuery$ = store.pipe(
            select(fromKeywords.getSearchQuery),
            take(1)
        );

        this.keywords$ = store.pipe(select(fromKeywords.getSearchResults));
        this.loading$ = store.pipe(select(fromKeywords.getSearchLoading));
        this.error$ = store.pipe(select(fromKeywords.getSearchError));

        this._unsubscribeAll = new Subject();

        this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.currentUrl = event.url;
                // (event.url == '/' || event.url == '/pages/shop') ? true : false;
            }
        });

        this._headerService.getDefaultKeywords({ $limit: 20 }).then(keywords => this.defaultKeywords = keywords);
    }

    search(query: string) {
        this.store.dispatch(new KeywordActions.Search(query));
    }

    onSummit(event) {
        let navigationExtras: NavigationExtras = {
            queryParams: { 'search': event },
            fragment: 'anchor'
        };

        this._router.navigate(['/pages/shop'], navigationExtras);
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
