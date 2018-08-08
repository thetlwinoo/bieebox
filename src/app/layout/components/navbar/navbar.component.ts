import { Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { BoxNavigationService } from '@box/components/navigation/navigation.service';
import { BoxPerfectScrollbarDirective } from '@box/directives/box-perfect-scrollbar/box-perfect-scrollbar.directive';
import { BoxSidebarService } from '@box/components/sidebar/sidebar.service';

@Component({
    selector     : 'navbar',
    templateUrl  : './navbar.component.html',
    styleUrls    : ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit, OnDestroy
{
    // Layout
    @Input()
    layout;

    boxPerfectScrollbarUpdateTimeout: any;
    navigation: any;

    // Private
    private _boxPerfectScrollbar: BoxPerfectScrollbarDirective;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {BoxNavigationService} _boxNavigationService
     * @param {BoxSidebarService} _boxSidebarService
     * @param {Router} _router
     */
    constructor(
        private _boxNavigationService: BoxNavigationService,
        private _boxSidebarService: BoxSidebarService,
        private _router: Router
    )
    {
        // Set the defaults
        this.layout = 'vertical';

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Directive
    @ViewChild(BoxPerfectScrollbarDirective)
    set directive(theDirective: BoxPerfectScrollbarDirective)
    {
        if ( !theDirective )
        {
            return;
        }

        this._boxPerfectScrollbar = theDirective;

        this._boxNavigationService.onItemCollapseToggled
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.boxPerfectScrollbarUpdateTimeout = setTimeout(() => {
                    this._boxPerfectScrollbar.update();
                }, 310);
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                    if ( this._boxSidebarService.getSidebar('navbar') )
                    {
                        this._boxSidebarService.getSidebar('navbar').close();
                    }
                }
            );

        // Get current navigation
        this._boxNavigationService.onNavigationChanged
            .pipe(filter(value => value !== null))
            .subscribe(() => {
                this.navigation = this._boxNavigationService.getCurrentNavigation();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        if ( this.boxPerfectScrollbarUpdateTimeout )
        {
            clearTimeout(this.boxPerfectScrollbarUpdateTimeout);
        }

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar opened status
     */
    toggleSidebarOpened(): void
    {
        this._boxSidebarService.getSidebar('navbar').toggleOpen();
    }

    /**
     * Toggle sidebar folded status
     */
    toggleSidebarFolded(): void
    {
        this._boxSidebarService.getSidebar('navbar').toggleFold();
    }
}
