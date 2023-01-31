import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CategoriesService } from "../../services/categories.service";
import { BehaviorSubject, map, Observable } from "rxjs";
import { CategoryModel } from "../../models/category.model";
import { WishlistStoreService } from "../../services/wishlist-store.service";
import { CartStoreService } from "../../services/cart-store.service";
import { CategoriesStoreService } from "../../services/categories-store.service";

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private _mobileMenuToggleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public mobileMenuToggle$: Observable<boolean> = this._mobileMenuToggleSubject.asObservable();

  readonly categories$: Observable<CategoryModel[]> = this._categoriesStoreService.categories$;

  readonly wishlistItems$: Observable<number> = this._wishlistStore.productsIds$.pipe(
    map(products => products.length)
  );

  readonly cartItems$: Observable<number> = this._cartStoreService.cartProducts$.pipe(
    map(items => items.reduce((acc, cur) => acc + cur.quantity, 0))
  );

  constructor(
    private _cartStoreService: CartStoreService,
    private _categoriesStoreService: CategoriesStoreService,
    private _wishlistStore: WishlistStoreService,
    private _categoriesService: CategoriesService
  ) {}

  toggleMenu(): void {
    this._mobileMenuToggleSubject.next(!this._mobileMenuToggleSubject.value);
  }
}
