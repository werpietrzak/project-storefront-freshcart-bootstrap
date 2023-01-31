import { NgModule } from '@angular/core';
import { ProductCardComponent } from './product-card.component';
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [CommonModule],
  declarations: [ProductCardComponent],
  providers: [],
  exports: [ProductCardComponent]
})
export class ProductCardComponentModule {
}
