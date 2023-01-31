import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { combineLatest, map, Observable, of } from "rxjs";
import { CartProductQueryModel } from "../../queryModels/cart-product-query.model";
import { CartStoreService } from "../../services/cart-store.service";
import { ProductsStoreService } from "../../services/products-store.service";

@Component({
  selector: 'app-cart',
  styleUrls: ['./cart.component.scss'],
  templateUrl: './cart.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  public cartItems$: Observable<CartProductQueryModel[]> = this._productsStoreService.products$.pipe(
    map(products => products.map(product => ({
      name: product.name,
      price: product.price,
      category: product.categoryId,
      imageUrl: product.imageUrl,
      id: product.id,
    })))
  );

  public itemSubtotal$: Observable<number> = this.cartItems$.pipe(
    map(items => items.reduce((acc, cur) => acc + cur.price, 0))
  );

  public shippingFee$: Observable<number> = of(3);

  public subtotal$: Observable<number> = combineLatest([
    this.itemSubtotal$,
    this.shippingFee$,
  ]).pipe(
    map(([itemsFee, shippingFee]) => itemsFee + shippingFee)
  );

  constructor(
    private _cartStoreService: CartStoreService,
    private _productsStoreService: ProductsStoreService,
  ) {}
}
