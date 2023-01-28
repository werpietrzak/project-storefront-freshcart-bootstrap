import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { combineLatest, map, Observable, of, startWith, switchMap } from "rxjs";
import { CategoryModel } from "../../models/category.model";
import { CategoriesService } from "../../services/categories.service";
import { ActivatedRoute } from "@angular/router";
import { ProductsService } from "../../services/products.service";
import { ProductQueryModel } from "../../queryModels/product-query.model";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-category-product-list',
  styleUrls: ['./category-product-list.component.scss'],
  templateUrl: './category-product-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryProductListComponent {
  readonly categories$: Observable<CategoryModel[]> = this._categoriesService.getAllCategories();

  readonly selectedCategory$: Observable<CategoryModel> = this._activatedRoute.params.pipe(
    switchMap(params => this._categoriesService.getOneCategory(params['categoryId']))
  );

  readonly sortingForm: FormControl = new FormControl({ value: '', property: 'id' });

  readonly sortingOptions$: Observable<{
    label: string,
    value: string,
    property: keyof ProductQueryModel
  }[]> = of([
    { label: 'Featured', value: 'desc', property: 'featureValue' },
    { label: 'Price: Low to High', value: 'asc', property: 'price' },
    { label: 'Price: High to Low', value: 'desc', property: 'price' },
    { label: 'Avg. Rating', value: 'desc', property: 'ratingValue' },
  ]);

  readonly products$: Observable<ProductQueryModel[]> = combineLatest([
    this.selectedCategory$,
    this._productsService.getAllProducts(),
    this.sortingForm.valueChanges.pipe(
      startWith({ value: '', property: '' }),
    ),
  ]).pipe(
    map(([category, products, order]) => products
      .reduce((acc: ProductQueryModel[], cur) => (
        cur.categoryId === category.id ? [...acc, {
          name: cur.name,
          price: cur.price,
          category: category.name,
          ratingValue: cur.ratingValue,
          ratingCount: cur.ratingCount,
          ratingStars: this.convertRatingToStars(cur.ratingValue),
          featureValue: cur.featureValue,
          imageUrl: cur.imageUrl,
          id: cur.id,
        }] : acc), [])
      .sort((a, b) => {
        const { value, property }: { value: string, property: keyof ProductQueryModel} = order;
        return value === 'asc' ? +a[property] - +b[property] : (value === 'desc' ? +b[property] - +a[property] : 0);
      }),
    )
  );

  constructor(
    private _categoriesService: CategoriesService,
    private _productsService: ProductsService,
    private _activatedRoute: ActivatedRoute,
    ) {}

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
