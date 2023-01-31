import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartStoreServiceModule } from '../../services/cart-store.service-module';
import { ProductsStoreServiceModule } from '../../services/products-store.service-module';
import { ProductsServiceModule } from '../../services/products.service-module';
import { CartComponent } from './cart.component';

@NgModule({
  imports: [CommonModule, CartStoreServiceModule, ProductsStoreServiceModule, ProductsServiceModule],
  declarations: [CartComponent],
  providers: [],
  exports: [CartComponent]
})
export class CartComponentModule {
}
