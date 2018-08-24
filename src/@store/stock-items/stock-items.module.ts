import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { StockItemEffects } from './effects/stock-item.effects';
import { reducers } from './reducers';
import { StockItemsService } from './services/stock-item.service';
import { StockItemExistsGuard } from './guards/stock-item-exists.guard';

import { Feathers } from '@box/services/feathers.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('stockItems', reducers),
    EffectsModule.forFeature([StockItemEffects]),
  ],
  declarations: [],
  providers: [
    Feathers,
    StockItemsService,
    StockItemExistsGuard
  ]
})
export class StockItemsModule { }
