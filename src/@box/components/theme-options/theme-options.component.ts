import { Component, HostBinding, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { boxAnimations } from '@box/animations';
import { BoxConfigService } from '@box/services/config.service';
import { BoxNavigationService } from '@box/components/navigation/navigation.service';
import { BoxSidebarService } from '@box/components/sidebar/sidebar.service';

@Component({
    selector   : 'box-theme-options',
    templateUrl: './theme-options.component.html',
    styleUrls  : ['./theme-options.component.scss'],
    animations : boxAnimations
})
export class BoxThemeOptionsComponent implements OnInit, OnDestroy
{
    boxConfig: any;
    form: FormGroup;

    @HostBinding('class.bar-closed')
    barClosed: boolean;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     * @param {BoxConfigService} _boxConfigService
     * @param {BoxNavigationService} _boxNavigationService
     * @param {BoxSidebarService} _boxSidebarService
     * @param {Renderer2} _renderer
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _boxConfigService: BoxConfigService,
        private _boxNavigationService: BoxNavigationService,
        private _boxSidebarService: BoxSidebarService,
        private _renderer: Renderer2
    )
    {
        // Set the defaults
        this.barClosed = true;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Build the config form
        // noinspection TypeScriptValidateTypes
        this.form = this._formBuilder.group({
            layout          : this._formBuilder.group({
                style  : new FormControl(),
                width  : new FormControl(),
                navbar : this._formBuilder.group({
                    hidden    : new FormControl(),
                    position  : new FormControl(),
                    folded    : new FormControl(),
                    background: new FormControl()
                }),
                toolbar: this._formBuilder.group({
                    hidden    : new FormControl(),
                    position  : new FormControl(),
                    background: new FormControl()
                }),
                footer : this._formBuilder.group({
                    hidden    : new FormControl(),
                    position  : new FormControl(),
                    background: new FormControl()
                })
            }),
            customScrollbars: new FormControl()
        });

        // Subscribe to the config changes
        this._boxConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {

                // Update the stored config
                this.boxConfig = config;

                // Set the config form values without emitting an event
                // so that we don't end up with an infinite loop
                this.form.setValue(config, {emitEvent: false});
            });

        // Subscribe to the specific form value changes (layout.style)
        this.form.get('layout.style').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((value) => {

                // Reset the form values based on the
                // selected layout style
                this._resetFormValues(value);

            });

        // Subscribe to the form value changes
        this.form.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {

                // Update the config
                this._boxConfigService.config = config;
            });

        // Add customize nav item that opens the bar programmatically
        const customFunctionNavItem = {
            'id'      : 'custom-function',
            'title'   : 'Custom Function',
            'type'    : 'group',
            'icon'    : 'settings',
            'children': [
                {
                    'id'      : 'customize',
                    'title'   : 'Customize',
                    'type'    : 'item',
                    'icon'    : 'settings',
                    'function': () => {
                        this.toggleSidebarOpen('themeOptionsPanel');
                    }
                }
            ]
        };

        this._boxNavigationService.addNavigationItem(customFunctionNavItem, 'end');
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

        // Remove the custom function menu
        this._boxNavigationService.removeNavigationItem('custom-function');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Reset the form values based on the
     * selected layout style
     *
     * @param value
     * @private
     */
    private _resetFormValues(value): void
    {
        switch ( value )
        {
            // Vertical Layout #1
            case 'vertical-layout-1':
            {
                this.form.patchValue({
                    layout: {
                        width  : 'fullwidth',
                        navbar : {
                            hidden    : false,
                            position  : 'left',
                            folded    : false,
                            background: 'mat-box-dark-700-bg'
                        },
                        toolbar: {
                            hidden    : false,
                            position  : 'below-static',
                            background: 'mat-white-500-bg'
                        },
                        footer : {
                            hidden    : false,
                            position  : 'below-static',
                            background: 'mat-box-dark-900-bg'
                        }
                    }
                });

                break;
            }

            // Vertical Layout #2
            case 'vertical-layout-2':
            {
                this.form.patchValue({
                    layout: {
                        width  : 'fullwidth',
                        navbar : {
                            hidden    : false,
                            position  : 'left',
                            folded    : false,
                            background: 'mat-box-dark-700-bg'
                        },
                        toolbar: {
                            hidden    : false,
                            position  : 'below',
                            background: 'mat-white-500-bg'
                        },
                        footer : {
                            hidden    : false,
                            position  : 'below',
                            background: 'mat-box-dark-900-bg'
                        }
                    }
                });

                break;
            }

            // Vertical Layout #3
            case 'vertical-layout-3':
            {
                this.form.patchValue({
                    layout: {
                        width  : 'fullwidth',
                        navbar : {
                            hidden    : false,
                            position  : 'left',
                            folded    : false,
                            background: 'mat-box-dark-700-bg'
                        },
                        toolbar: {
                            hidden    : false,
                            position  : 'above-static',
                            background: 'mat-white-500-bg'
                        },
                        footer : {
                            hidden    : false,
                            position  : 'above-static',
                            background: 'mat-box-dark-900-bg'
                        }
                    }
                });

                break;
            }

            // Horizontal Layout #1
            case 'horizontal-layout-1':
            {
                this.form.patchValue({
                    layout: {
                        width  : 'fullwidth',
                        navbar : {
                            hidden    : false,
                            position  : 'top',
                            folded    : false,
                            background: 'mat-box-dark-700-bg'
                        },
                        toolbar: {
                            hidden    : false,
                            position  : 'above',
                            background: 'mat-white-500-bg'
                        },
                        footer : {
                            hidden    : false,
                            position  : 'above-fixed',
                            background: 'mat-box-dark-900-bg'
                        }
                    }
                });

                break;
            }
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void
    {
        this._boxSidebarService.getSidebar(key).toggleOpen();
    }

}
