import { NgModule } from '@angular/core';
import { CategoryListGridComponentModule } from '../category-list-grid/category-list-grid.component-module';
import { CategoriesServiceModule } from '../../services/categories.service-module';
import { HomepageComponent } from './homepage.component';

@NgModule({
  imports: [CategoryListGridComponentModule, CategoriesServiceModule],
  declarations: [HomepageComponent],
  providers: [],
  exports: [HomepageComponent]
})
export class HomepageComponentModule {
}
