import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { combineLatest, map, Observable } from "rxjs";
import { ProductModel } from "../../models/product.model";
import { WishlistStoreService } from "../../services/wishlist-store.service";
import { ProductsStoreService } from "../../services/products-store.service";

@Component({
  selector: 'app-wishlist',
  styleUrls: ['./wishlist.component.scss'],
  templateUrl: './wishlist.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistComponent {
  public wishlistProducts$: Observable<ProductModel[]> = combineLatest([
    this._productsStoreService.products$,
    this._wishlistStoreService.productsIds$,
  ]).pipe(
    map(([products, selectedIds]) => products.filter(product => selectedIds.includes(product.id))
    )
  );

  constructor(
    private _productsStoreService: ProductsStoreService,
    private _wishlistStoreService: WishlistStoreService,
  ) {}
}
