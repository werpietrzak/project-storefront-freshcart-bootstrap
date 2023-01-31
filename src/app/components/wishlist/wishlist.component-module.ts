import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponentModule } from '../product-card/product-card.component-module';
import { CategoriesStoreServiceModule } from '../../services/categories-store.service-module';
import { WishlistStoreServiceModule } from '../../services/wishlist-store.service-module';
import { CategoriesServiceModule } from '../../services/categories.service-module';
import { WishlistComponent } from './wishlist.component';

@NgModule({
  imports: [CommonModule, ProductCardComponentModule, CategoriesStoreServiceModule, WishlistStoreServiceModule, CategoriesServiceModule],
  declarations: [WishlistComponent],
  providers: [],
  exports: [WishlistComponent]
})
export class WishlistComponentModule {
}
