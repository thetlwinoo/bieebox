import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { BoxDemoModule } from '@box/components/demo/demo.module';
import { BoxSidebarModule } from '@box/components/sidebar/sidebar.module';
import { MatIconModule, MatDividerModule, MatListModule, MatExpansionModule, MatFormFieldModule, MatDatepickerModule, MatButtonModule } from '@angular/material';
import { BoxSharedModule } from '@box/shared.module';
import { BrandModule } from '@box/components/brand/brand.module';

const routes = [
  {
      path     : 'cart',
      component: CartComponent,
      data: {
        breadcrumbs: 'Home / Cart'
      }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    BoxSharedModule,
    BoxDemoModule,
    BoxSidebarModule,
    BrandModule,
    MatIconModule,
    MatDividerModule, 
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule
  ],
  declarations: [CartComponent]
})
export class CartModule { }
