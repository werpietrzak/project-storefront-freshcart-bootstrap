import { NgModule } from '@angular/core';
import { CartComponent } from './cart.component';
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [CommonModule],
  declarations: [CartComponent],
  providers: [],
  exports: [CartComponent]
})
export class CartComponentModule {
}
