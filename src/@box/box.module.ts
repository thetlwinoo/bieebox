import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { BOX_CONFIG, BoxConfigService } from '@box/services/config.service';
import { BoxCopierService } from '@box/services/copier.service';
import { BoxMatchMediaService } from '@box/services/match-media.service';
import { BoxMatSidenavHelperService } from '@box/directives/box-mat-sidenav/box-mat-sidenav.service';
import { BoxNavigationService } from '@box/components/navigation/navigation.service';
import { BoxSidebarService } from '@box/components/sidebar/sidebar.service';
import { BoxSplashScreenService } from '@box/services/splash-screen.service';
import { BoxTranslationLoaderService } from '@box/services/translation-loader.service';
import { AuthService } from '@box/services/auth.service';
import { PeopleService } from '@box/services/people.service';
import { BoxInMemoryService } from '@box/services/in-memory.service';
import { SnackBarService } from '@box/services/snackbar.service';
import { StorageService, LocalStorageService } from '@box/services/storage.service';
// import { CachcingServiceBase } from '@box/services/caching.service';

@NgModule({
    entryComponents: [],
    providers: [
        BoxConfigService,
        BoxCopierService,
        BoxMatchMediaService,
        BoxMatSidenavHelperService,
        BoxNavigationService,
        BoxSidebarService,
        BoxSplashScreenService,
        BoxTranslationLoaderService,
        AuthService,
        PeopleService,
        SnackBarService,
        BoxInMemoryService,
        { provide: StorageService, useClass: LocalStorageService },
    ]
})
export class BoxModule {
    constructor(@Optional() @SkipSelf() parentModule: BoxModule) {
        if (parentModule) {
            throw new Error('BoxModule is already loaded. Import it in the AppModule only!');
        }
    }

    static forRoot(config): ModuleWithProviders {
        return {
            ngModule: BoxModule,
            providers: [
                {
                    provide: BOX_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
