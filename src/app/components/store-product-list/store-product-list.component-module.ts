import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreProductListComponent } from './store-product-list.component';
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [StoreProductListComponent],
  providers: [],
  exports: [StoreProductListComponent]
})
export class StoreProductListComponentModule {
}
