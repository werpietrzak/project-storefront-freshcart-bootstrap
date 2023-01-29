import { NgModule } from '@angular/core';
import { StoreListGridComponentModule } from '../store-list-grid/store-list-grid.component-module';
import { StoresServiceModule } from '../../services/stores.service-module';
import { CategoryListGridComponentModule } from '../category-list-grid/category-list-grid.component-module';
import { CategoriesServiceModule } from '../../services/categories.service-module';
import { HomepageComponent } from './homepage.component';

@NgModule({
  imports: [CategoryListGridComponentModule, CategoriesServiceModule, StoreListGridComponentModule, StoresServiceModule],
  declarations: [HomepageComponent],
  providers: [],
  exports: [HomepageComponent]
})
export class HomepageComponentModule {
}
