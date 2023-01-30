import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryProductListComponent } from './category-product-list.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  declarations: [CategoryProductListComponent],
  providers: [],
  exports: [CategoryProductListComponent]
})
export class CategoryProductListComponentModule {
}
