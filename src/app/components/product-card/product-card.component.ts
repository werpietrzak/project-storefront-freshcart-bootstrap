import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ProductModel } from "../../models/product.model";
import { ProductQueryModel } from "../../queryModels/product-query.model";
import { BehaviorSubject, combineLatest, map, Observable } from "rxjs";
import { WishlistStore } from "../../stores/wishlist.store";
import { CategoriesStoreService } from "../../services/categories-store.service";
import { CartStoreService } from "../../services/cart-store.service";

@Component({
  selector: 'app-product-card',
  styleUrls: ['./product-card.component.scss'],
  templateUrl: './product-card.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input() product!: ProductModel;

  private _productSubject: BehaviorSubject<ProductModel> = new BehaviorSubject<ProductModel>({
    name: '',
    price: 0,
    categoryId: '',
    ratingValue: 0,
    ratingCount: 0,
    imageUrl: '',
    featureValue: 0,
    storeIds: [''],
    id: '',
  });

  readonly product$: Observable<ProductModel> = this._productSubject.asObservable();

  public displayedProduct$: Observable<ProductQueryModel> = combineLatest([
    this.product$,
    this._wishlistStoreService.productsIds$,
    this._categoriesStoreService.categories$,
  ]).pipe(
    map(([product, wishlistIds, categories]) => {
        const categoryMap = categories.reduce((acc, cur) => {
          acc[cur.id] = cur.name;
          return acc;
        }, {} as { [id: string]: string })
        return {
          name: product.name,
          price: product.price,
          category: categoryMap[product.categoryId],
          ratingValue: product.ratingValue,
          ratingCount: product?.ratingCount,
          ratingStars: this.convertRatingToStars(product?.ratingValue),
          featureValue: product?.featureValue,
          imageUrl: product?.imageUrl,
          id: product?.id,
          isWishlisted: wishlistIds.includes(product?.id),
        }
      }
    )
  );

  constructor(
    private _cartStoreService: CartStoreService,
    private _categoriesStoreService: CategoriesStoreService,
    private _wishlistStoreService: WishlistStore
  ) {}

  ngOnInit(): void {
    this._productSubject.next(this.product);
  }

  public updateWishlist(productId: string): void {
    this._wishlistStoreService.productsIdsSubject.next(
      this._wishlistStoreService.productsIdsSubject.value.filter(a => a !== productId)
    );
  }

  public addToCart(productId: string): void {
    const currentCartItems = this._cartStoreService.getCartProducts;
    const index = currentCartItems.findIndex(entry => entry.productId === productId);

    if (index !== -1) {
      currentCartItems[index] = { productId, quantity: currentCartItems[index].quantity + 1 };
      this._cartStoreService.updateCartProducts([...currentCartItems]);
    } else {
      this._cartStoreService.updateCartProducts([
        ...currentCartItems,
        { productId, quantity: 1 },
      ]);
    }
  }

  private convertRatingToStars(rating: number): number[] {
    let result = new Array(5).fill(0);
    for (let i = 0; i < 5; i++) {
      if (rating >= 1) {
        result[i] = 1;
        rating -= 1;
      } else {
        result[i] = rating;
        break;
      }
    }
    return result;
  }
}
