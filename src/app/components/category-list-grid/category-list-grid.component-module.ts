import { NgModule } from '@angular/core';
import { CategoryListGridComponent } from './category-list-grid.component';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [CategoryListGridComponent],
  providers: [],
  exports: [CategoryListGridComponent]
})
export class CategoryListGridComponentModule {
}
