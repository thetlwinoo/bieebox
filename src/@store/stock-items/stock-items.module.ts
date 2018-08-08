import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { StockItemEffects } from './effects/stock-item.effects';
import { reducers } from './reducers';
import { BBSotreModule } from '../store.module';

@NgModule({
  imports: [
    CommonModule,
    BBSotreModule,
    StoreModule.forFeature('stockItems', reducers),
    EffectsModule.forFeature([StockItemEffects]),
  ],
  declarations: [],
  providers: []
})
export class StockItemsModule { }
