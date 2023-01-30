import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable} from "rxjs";
import {ProductModel} from "../../models/product.model";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-wishlist',
  styleUrls: ['./wishlist.component.scss'],
  templateUrl: './wishlist.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistComponent {
  private _wishlistedProductsIdsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(['1', '2', '3']);

  readonly wishlistedProductsIds$: Observable<string[]> = this._wishlistedProductsIdsSubject.asObservable();

  private _products$: Observable<ProductModel[]> = this._productsService.getAllProducts();

  public wishlistedProducts$: Observable<ProductModel[]> = combineLatest([
    this._products$,
    this.wishlistedProductsIds$,
  ]).pipe(
    map(([products, selectedIds]) => products.filter(product => selectedIds.includes(product.id)))
  );

  constructor(private _productsService: ProductsService) {}

  removeFromWishlist(productId: string) {
    this._wishlistedProductsIdsSubject.next(
      this._wishlistedProductsIdsSubject.value.filter(a => a !== productId)
    );
  }
}
