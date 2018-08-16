import { NgModule } from '@angular/core';
import { StockItemsModule } from './stock-items/stock-items.module';
import { KeywordsModule } from './keywords/keywords.module';

@NgModule({
    imports  : [
        StockItemsModule,
        KeywordsModule
    ],
    exports  : [
        StockItemsModule,
        KeywordsModule
    ]
})
export class BoxStoreModule {}
