import { NgModule } from '@angular/core';
import { WishlistComponent } from './wishlist.component';
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [CommonModule],
  declarations: [WishlistComponent],
  providers: [],
  exports: [WishlistComponent]
})
export class WishlistComponentModule {
}
