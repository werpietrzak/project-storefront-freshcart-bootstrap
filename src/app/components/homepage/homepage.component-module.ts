import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsServiceModule } from '../../services/products.service-module';
import { FeaturedCategoryComponentModule } from '../featured-category/featured-category.component-module';
import { StoreListGridComponentModule } from '../store-list-grid/store-list-grid.component-module';
import { StoresServiceModule } from '../../services/stores.service-module';
import { CategoryListGridComponentModule } from '../category-list-grid/category-list-grid.component-module';
import { CategoriesServiceModule } from '../../services/categories.service-module';
import { HomepageComponent } from './homepage.component';

@NgModule({
  imports: [CommonModule, ProductsServiceModule, StoreListGridComponentModule, StoresServiceModule, FeaturedCategoryComponentModule, CategoryListGridComponentModule, CategoriesServiceModule],
  declarations: [HomepageComponent],
  providers: [],
  exports: [HomepageComponent]
})
export class HomepageComponentModule {
}
