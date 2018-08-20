import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BoxConfigService } from '@box/services/config.service';
import { BoxNavigationService } from '@box/components/navigation/navigation.service';
import { BoxSidebarService } from '@box/components/sidebar/sidebar.service';
import { BoxSplashScreenService } from '@box/services/splash-screen.service';
import { BoxTranslationLoaderService } from '@box/services/translation-loader.service';

import { navigation } from 'app/navigation/navigation';
import { locale as navigationEnglish } from 'app/navigation/i18n/en';
import { locale as navigationTurkish } from 'app/navigation/i18n/tr';

import * as fromRoot from './reducers';
import * as cart from '@store/checkout/actions/cart';
import { Store } from '@ngrx/store';

import { SnackBarService } from '@box/services/snackbar.service';
import { Subscription } from 'rxjs/Subscription';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    navigation: any;
    boxConfig: any;
    snackSub: Subscription;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {BoxConfigService} _boxConfigService
     * @param {BoxNavigationService} _boxNavigationService
     * @param {BoxSidebarService} _boxSidebarService
     * @param {BoxSplashScreenService} _boxSplashScreenService
     * @param {BoxTranslationLoaderService} _boxTranslationLoaderService
     * @param {TranslateService} _translateService
     */
    constructor(
        private _boxConfigService: BoxConfigService,
        private _boxNavigationService: BoxNavigationService,
        private _boxSidebarService: BoxSidebarService,
        private _boxSplashScreenService: BoxSplashScreenService,
        private _boxTranslationLoaderService: BoxTranslationLoaderService,
        private _translateService: TranslateService,
        public store: Store<fromRoot.State>,
        private snack: SnackBarService,
        private snackBar: MatSnackBar,
    ) {
        this.snackSub = this.snack.getMessage().subscribe(message => {
            this.snackBar.open(message.text, "close", {
                duration: 5000,
            });
        });

        // Get default navigation
        this.navigation = navigation;

        // Register the navigation to the service
        this._boxNavigationService.register('main', this.navigation);

        // Set the main navigation as our current navigation
        this._boxNavigationService.setCurrentNavigation('main');

        // Add languages
        this._translateService.addLangs(['en', 'tr']);

        // Set the default language
        this._translateService.setDefaultLang('en');

        // Set the navigation translations
        this._boxTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

        // Use a language
        this._translateService.use('en');

        this.store.dispatch(new cart.LoadCart);

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to config changes
        this._boxConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.boxConfig = config;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.snackSub.unsubscribe();
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._boxSidebarService.getSidebar(key).toggleOpen();
    }
}
