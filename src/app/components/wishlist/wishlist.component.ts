import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { combineLatest, map, Observable } from "rxjs";
import { ProductModel } from "../../models/product.model";
import { ProductsService } from "../../services/products.service";
import { WishlistStore } from "../../stores/wishlist.store";

@Component({
  selector: 'app-wishlist',
  styleUrls: ['./wishlist.component.scss'],
  templateUrl: './wishlist.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistComponent {
  private _products$: Observable<ProductModel[]> = this._productsService.getAllProducts();

  public wishlistedProducts$: Observable<ProductModel[]> = combineLatest([
    this._products$,
    this._wishlistStore.productsIds$,
  ]).pipe(
    map(([products, selectedIds]) => products.filter(product => selectedIds.includes(product.id)))
  );

  constructor(
    private _productsService: ProductsService,
    private _wishlistStore: WishlistStore,
  ) {}

  removeFromWishlist(productId: string) {
    this._wishlistStore.productsIdsSubject.next(
      this._wishlistStore.productsIdsSubject.value.filter(a => a !== productId)
    );
  }
}
