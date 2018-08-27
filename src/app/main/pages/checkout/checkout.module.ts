import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { BoxDemoModule } from '@box/components/demo/demo.module';
import { BoxSidebarModule } from '@box/components/sidebar/sidebar.module';
import { MatIconModule, MatCheckboxModule, MatDividerModule, MatListModule, MatExpansionModule, MatFormFieldModule, MatDatepickerModule, MatButtonModule, MatDialogModule, MatInputModule, MatRadioModule } from '@angular/material';
import { BoxSharedModule } from '@box/shared.module';
// import { BrandModule } from '@box/components/brand/brand.module';
import { CheckoutService } from './checkout.service';
import { NewAddressDialogComponent } from './new-address-dialog/new-address-dialog.component';
import { AuthGuard } from 'app/guards/auth.guard';
import { AddressModule } from '@store/address/address.module';
import { ViewCheckoutPageComponent } from './view-checkout-page/view-checkout-page.component';

const routes = [
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumbs: 'Home / Checkout'
    },
    // resolve: {
    //   data: CheckoutService
    // }    
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    BoxSharedModule,
    BoxDemoModule,
    BoxSidebarModule,
    AddressModule,
    // BrandModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  declarations: [CheckoutComponent, NewAddressDialogComponent, ViewCheckoutPageComponent],
  providers: [
    CheckoutService
  ],
  entryComponents: [NewAddressDialogComponent]
})
export class CheckoutModule { }
