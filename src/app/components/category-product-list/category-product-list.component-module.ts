import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductCardComponentModule } from '../product-card/product-card.component-module';
import { CartStoreServiceModule } from '../../services/cart-store.service-module';
import { CategoriesStoreServiceModule } from '../../services/categories-store.service-module';
import { WishlistStoreServiceModule } from '../../services/wishlist-store.service-module';
import { CategoriesServiceModule } from '../../services/categories.service-module';
import { CategoryProductListComponent } from './category-product-list.component';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ProductCardComponentModule, CartStoreServiceModule, CategoriesStoreServiceModule, WishlistStoreServiceModule, CategoriesServiceModule],
  declarations: [CategoryProductListComponent],
  providers: [],
  exports: [CategoryProductListComponent]
})
export class CategoryProductListComponentModule {
}
