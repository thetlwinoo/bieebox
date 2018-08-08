import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { Feathers } from '@store/services/feathers.service';
import { StockItemsService } from './stock-items/services/stock-item.service';

@NgModule({
    entryComponents: [],
    providers: [
        Feathers,
        StockItemsService
    ]
})
export class BBSotreModule {
    constructor(@Optional() @SkipSelf() parentModule: BBSotreModule) {
        if (parentModule) {
            throw new Error('FuseModule is already loaded. Import it in the AppModule only!');
        }
    }

    static forRoot(config): ModuleWithProviders {
        return {
            ngModule: BBSotreModule,
            providers: []
        };
    }
}
