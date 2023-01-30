import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { combineLatest, map, Observable, of, shareReplay, startWith, switchMap, take, tap } from "rxjs";
import { CategoryModel } from "../../models/category.model";
import { CategoriesService } from "../../services/categories.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductsService } from "../../services/products.service";
import { ProductQueryModel } from "../../queryModels/product-query.model";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-category-product-list',
  styleUrls: ['./category-product-list.component.scss'],
  templateUrl: './category-product-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryProductListComponent {
  readonly queryParams$: Observable<{
    page: number,
    itemsPerPage: number,
  }> = this._activatedRoute.queryParams.pipe(
    map(params => ({
      page: params['page'] ? +params['page'] : 1,
      itemsPerPage: params['itemsPerPage'] ? +params['itemsPerPage'] : 5,
    })),
    shareReplay(1),
  );

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
    map(([category, products]) => products
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
    )
  );

  readonly displayedProducts$: Observable<ProductQueryModel[]> = combineLatest([
    this.products$,
    this.sortingForm.valueChanges.pipe(
      startWith({ value: '', property: '' }),
    ),
    this.queryParams$,
  ]).pipe(
    map(([products, order, params]) => {
        const sliceStart = params.itemsPerPage * (params.page - 1);
        return products
          .sort((a, b) => {
            const {value, property}: { value: string, property: keyof ProductQueryModel } = order;
            return value === 'asc' ? +a[property] - +b[property] :
              (value === 'desc' ? +b[property] - +a[property] : 0);
          })
          .slice(sliceStart, sliceStart + params.itemsPerPage)
      }
    )
  );

  readonly paginationForm: FormGroup = new FormGroup({
    itemsPerPage: new FormControl(),
    page: new FormControl(),
  });

  readonly itemsPerPageValues$: Observable<number[]> = of([5, 10, 15]);

  readonly pages$: Observable<number[]> = combineLatest([
    this.queryParams$,
    this.products$
  ]).pipe(
    map(([params, products]) => (
      [...Array(Math.ceil(products.length / params.itemsPerPage)).keys()].map(a => ++a)
      )
    )
  );

  constructor(
    private _categoriesService: CategoriesService,
    private _productsService: ProductsService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
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

  setItemsPerPage(value: number): void {
    combineLatest([
      this.queryParams$,
      this.products$,
    ]).pipe(
      take(1),
      tap(([params, products]) => {
        this._router.navigate([], { queryParams: {
            pageNumber: params.page > Math.ceil(products.length / value) ?
              Math.ceil(products.length / value) : params.page,
            itemsPerPage: value,
          }})
      })
    ).subscribe();
  }

  setPage(value: number): void {
    this.queryParams$.pipe(
      take(1),
      tap(params => {
        this._router.navigate([], { queryParams: {
            page: value,
            itemsPerPage: params.itemsPerPage,
          }})
      })
    ).subscribe();
  }
}
