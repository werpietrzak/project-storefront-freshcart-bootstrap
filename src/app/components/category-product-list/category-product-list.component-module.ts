import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryProductListComponent } from './category-product-list.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [CategoryProductListComponent],
  providers: [],
  exports: [CategoryProductListComponent]
})
export class CategoryProductListComponentModule {
}
