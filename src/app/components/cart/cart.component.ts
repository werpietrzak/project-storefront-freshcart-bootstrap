import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { combineLatest, map, Observable, of } from "rxjs";
import { CartProductQueryModel } from "../../queryModels/cart-product-query.model";
import { CartStoreService } from "../../services/cart-store.service";
import { ProductsStoreService } from "../../services/products-store.service";
import { ProductModel } from "../../models/product.model";

@Component({
  selector: 'app-cart',
  styleUrls: ['./cart.component.scss'],
  templateUrl: './cart.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  public cartItems$: Observable<CartProductQueryModel[]> = combineLatest([
    this._cartStoreService.cartProducts$,
    this._productsStoreService.products$,
  ]).pipe(
    map(([cartItems, products]) => cartItems.map(item => {
      const productMap = products.reduce((acc, cur) => {
        acc[cur.id] = cur;
        return acc;
      }, {} as { [id: string]: ProductModel });
      return ({
        name: productMap[item.productId].name,
        pricePerUnit: productMap[item.productId].price,
        imageUrl: productMap[item.productId].imageUrl,
        id: item.productId,
        quantity: item.quantity,
        totalPrice: item.quantity * productMap[item.productId].price,
      })
    }))
  );

  public itemSubtotal$: Observable<number> = this.cartItems$.pipe(
    map(items => items.reduce((acc, cur) => acc + cur.totalPrice, 0))
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

  public changeQuantity(value: string, productId: string): void {
    const cartItems = this._cartStoreService.getCartProducts;
    const index = cartItems.findIndex(entry => entry.productId === productId);

    if (value === '-' && cartItems[index].quantity === 1) {
      this.removeFromCart(productId);
    } else {
      cartItems[index] = {
        productId,
        quantity: value === '+' ? cartItems[index].quantity + 1 : cartItems[index].quantity - 1,
      };
      this._cartStoreService.updateCartProducts(cartItems);
    }
  }

  public removeFromCart(productId: string): void {
    this._cartStoreService.updateCartProducts(
      this._cartStoreService.getCartProducts.filter(item => item.productId !== productId)
    );
  }
}
