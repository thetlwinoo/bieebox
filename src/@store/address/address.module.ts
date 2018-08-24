import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AddressEffects } from './effects/address.effects';
import { reducers } from './reducers';
import { AddressService } from './services/address.service';

import { Feathers } from '@box/services/feathers.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('addresses', reducers),
    EffectsModule.forFeature([AddressEffects]),
  ],
  declarations: [],
  providers: [
    Feathers,
    AddressService    
  ]
})
export class AddressModule { }
