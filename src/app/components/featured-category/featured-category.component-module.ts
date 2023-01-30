import { NgModule } from '@angular/core';
import { FeaturedCategoryComponent } from './featured-category.component';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [FeaturedCategoryComponent],
  providers: [],
  exports: [FeaturedCategoryComponent]
})
export class FeaturedCategoryComponentModule {
}
