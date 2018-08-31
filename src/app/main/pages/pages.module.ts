import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from 'app/main/pages/home/home.module';
import { ShopModule } from 'app/main/pages/shop/shop.module';
import { CheckoutModule } from 'app/main/pages/checkout/checkout.module';
import { CheckoutCompletedModule } from 'app/main/pages/checkout-completed/checkout-completed.module';
import { CartModule } from 'app/main/pages/cart/cart.module';
import { WishlistModule } from 'app/main/pages/wishlist/wishlist.module';

@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    ShopModule,
    CheckoutModule,
    CheckoutCompletedModule,
    CartModule,
    WishlistModule
  ],
  declarations: []
})
export class PagesModule { }
