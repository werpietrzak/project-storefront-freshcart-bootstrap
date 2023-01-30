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
  public wishlistProducts$: Observable<ProductModel[]> = combineLatest([
    this._productsService.getAllProducts(),
    this._wishlistStoreService.productsIds$,
  ]).pipe(
    map(([products, selectedIds]) => products.filter(product => selectedIds.includes(product.id))
    )
  );

  constructor(
    private _productsService: ProductsService,
    private _wishlistStoreService: WishlistStore,
  ) {}
}
