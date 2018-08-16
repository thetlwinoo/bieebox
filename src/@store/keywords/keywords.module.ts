import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { KeywordEffects } from './effects/keyword.effects';
import { reducers } from './reducers';
import { KeywordsService } from './services/keywords.service';

import { Feathers } from '@store/services/feathers.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('keywords', reducers),
    EffectsModule.forFeature([KeywordEffects]),
  ],
  declarations: [],
  providers: [
    Feathers,
    KeywordsService    
  ]
})
export class KeywordsModule { }
