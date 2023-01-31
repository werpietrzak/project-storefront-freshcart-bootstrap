import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponentModule } from '../product-card/product-card.component-module';
import { CategoriesStoreServiceModule } from '../../services/categories-store.service-module';
import { WishlistStoreModule } from '../../stores/wishlist.store-module';
import { CategoriesServiceModule } from '../../services/categories.service-module';
import { WishlistComponent } from './wishlist.component';

@NgModule({
  imports: [CommonModule, ProductCardComponentModule, CategoriesStoreServiceModule, WishlistStoreModule, CategoriesServiceModule],
  declarations: [WishlistComponent],
  providers: [],
  exports: [WishlistComponent]
})
export class WishlistComponentModule {
}
