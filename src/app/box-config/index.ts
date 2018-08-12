import { BoxConfig } from '@box/types';

/**
 * Default Box Configuration
 *
 * You can edit these options to change the default options. All these options also can be changed per component
 * basis. See `app/main/pages/authentication/login/login.component.ts` constructor method to learn more
 * about changing these options per component basis.
 */

export const boxConfig: BoxConfig = {
    layout: {
        style: 'horizontal-layout-1',
        width: 'fullwidth',
        notification: {
            hidden: false,
            position: 'top',
            background: 'mat-box-dark-700-bg',
        },
        header: {
            hidden: false,  
            position: 'top',
            background: 'mat-box-dark-700-bg',
            custom: 'header-area theme-bg'
        },
        navbar: {
            hidden: false,
            position: 'top',
            folded: false,
            background: 'mat-box-dark-700-bg'
        },
        toolbar: {
            hidden: false,
            position: 'above',
            background: 'mat-black-500-bg'
        },
        brand: {
            background: 'mat-box-dark-900-bg',
            hidden: true,
            position: 'below'
        },
        shop: {
            background: 'mat-box-dark-900-bg',
            hidden: false,
            position: 'below'
        },
        footer: {
            background: 'mat-box-dark-900-bg',
            style: 'footer-area black-bg pt-65',
            hidden: false,
            position: 'below'
        },
        newsletter: {
            background: 'mat-box-dark-900-bg',
            hidden: false,
            position: 'below'
        },
        sidepanel: {
            hidden: false,
            position: 'right'
        }
    },
    customScrollbars: true
};
