import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { map, Observable } from "rxjs";
import { CategoryModel } from "../../models/category.model";
import { ProductModel } from "../../models/product.model";
import { ProductsService } from "../../services/products.service";
import { CategoriesStoreService } from "../../services/categories-store.service";

@Component({
  selector: 'app-featured-category',
  styleUrls: ['./featured-category.component.scss'],
  templateUrl: './featured-category.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturedCategoryComponent {
  @Input() categoryId: string;

  readonly category$: Observable<CategoryModel> = this._categoriesStoreService.categories$.pipe(
    map(categories => categories.find(category => category.id === this.categoryId)!)
  );

  readonly featuredProducts$: Observable<ProductModel[]> = this._productsService.getAllProducts().pipe(
    map(products => products
      .filter(product => product.categoryId === this.categoryId)
      .sort((a, b) => b.featureValue - a.featureValue)
      .slice(0, 5)
    )
  );

  constructor(
    private _productsService: ProductsService,
    private _categoriesStoreService: CategoriesStoreService,
  ) {}
}
