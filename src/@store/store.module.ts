import { NgModule } from '@angular/core';
import { StockItemsModule } from './stock-items/stock-items.module';
import { KeywordsModule } from './keywords/keywords.module';
import { AddressModule } from './address/address.module';

@NgModule({
    imports  : [
        StockItemsModule,
        KeywordsModule,
        AddressModule
    ],
    exports  : [
        StockItemsModule,
        KeywordsModule,
        AddressModule
    ]
})
export class BoxStoreModule {}
