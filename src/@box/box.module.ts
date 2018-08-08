import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { FUSE_CONFIG, BoxConfigService } from '@box/services/config.service';
import { BoxCopierService } from '@box/services/copier.service';
import { BoxMatchMediaService } from '@box/services/match-media.service';
import { BoxMatSidenavHelperService } from '@box/directives/box-mat-sidenav/box-mat-sidenav.service';
import { BoxNavigationService } from '@box/components/navigation/navigation.service';
import { BoxSidebarService } from '@box/components/sidebar/sidebar.service';
import { BoxSplashScreenService } from '@box/services/splash-screen.service';
import { BoxTranslationLoaderService } from '@box/services/translation-loader.service';

@NgModule({
    entryComponents: [],
    providers      : [
        BoxConfigService,
        BoxCopierService,
        BoxMatchMediaService,
        BoxMatSidenavHelperService,
        BoxNavigationService,
        BoxSidebarService,
        BoxSplashScreenService,
        BoxTranslationLoaderService
    ]
})
export class BoxModule
{
    constructor(@Optional() @SkipSelf() parentModule: BoxModule)
    {
        if ( parentModule )
        {
            throw new Error('BoxModule is already loaded. Import it in the AppModule only!');
        }
    }

    static forRoot(config): ModuleWithProviders
    {
        return {
            ngModule : BoxModule,
            providers: [
                {
                    provide : FUSE_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
