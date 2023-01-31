import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  switchMap,
  take,
  tap
} from "rxjs";
import { CategoryModel } from "../../models/category.model";
import { CategoriesService } from "../../services/categories.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { StoreModel } from "../../models/store.model";
import { PaginationQueryModel } from "../../queryModels/pagination-query.model";
import { SortingOptionQueryModel } from "../../queryModels/sorting-option-query.model";
import { CategoriesStoreService } from "../../services/categories-store.service";
import { StoresStoreService } from "../../services/stores-store.service";
import { ProductsStoreService } from "../../services/products-store.service";
import { ProductModel } from "../../models/product.model";

@Component({
  selector: 'app-category-product-list',
  styleUrls: ['./category-product-list.component.scss'],
  templateUrl: './category-product-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryProductListComponent {
  readonly selectedCategory$: Observable<CategoryModel> = this._activatedRoute.params.pipe(
    switchMap(params => this._categoriesService.getOneCategory(params['categoryId'])),
    shareReplay(1)
  );

  readonly queryParams$: Observable<PaginationQueryModel> = this._activatedRoute.queryParams.pipe(
    map(params => ({
      page: params['page'] ? +params['page'] : 1,
      itemsPerPage: params['itemsPerPage'] ? +params['itemsPerPage'] : 5,
    })),
    shareReplay(1),
  );

  // categories

  readonly categories$: Observable<CategoryModel[]> = this._categoriesStoreService.categories$;

  // store filter

  private _selectedStoresSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  public selectedStores$: Observable<string[]> = this._selectedStoresSubject.asObservable();

  readonly storeFilter: FormControl = new FormControl('');

  readonly stores$: Observable<StoreModel[]> = combineLatest([
    this._storesStoreService.stores$,
    this.storeFilter.valueChanges.pipe(startWith('')),
    this.selectedStores$,
  ]).pipe(
    map(([stores, query, selectedStores]) => stores.filter(
      store => store.name.toLowerCase().includes(query.toLowerCase())
        || selectedStores.includes(store.id)
    ))
  );

  readonly filterForm: FormGroup = new FormGroup({
    priceFrom: new FormControl('', [Validators.pattern("^[0-9]*$")]),
    priceTo: new FormControl('', [Validators.pattern("^[0-9]*$")]),
    rating: new FormControl(),
  });

  // rating filter

  readonly starRatings$: Observable<{ value: number, stars: number[] }[]> = of([5, 4, 3, 2, 1].map(
    a => {
      const result = Array(5).fill(0);
      for (let i = 0; i < a; i++) {
        result[i] = 1;
      }
      return { value: a, stars: result }
    }
  ));

  // sorting

  readonly sortingOptions$: Observable<SortingOptionQueryModel[]> = of([
    { label: 'Featured', value: 'desc', property: 'featureValue' },
    { label: 'Price: Low to High', value: 'asc', property: 'price' },
    { label: 'Price: High to Low', value: 'desc', property: 'price' },
    { label: 'Avg. Rating', value: 'desc', property: 'ratingValue' },
  ]);

  readonly sortingForm: FormControl = new FormControl();

  // products

  readonly products$: Observable<ProductModel[]> = combineLatest([
    this.selectedCategory$,
    this._productsStoreService.products$,
    this.filterForm.valueChanges.pipe(
      startWith({ priceFrom: '', priceTo: '' }),
      debounceTime(500),
    ),
    this.selectedStores$,
  ]).pipe(
    map(([category, products, filters, storeIds]) => {
        const { priceFrom, priceTo, rating } = filters;
        return products
          .filter(product => (
            product.categoryId === category.id &&
            (!priceFrom || !priceFrom.length || product.price >= +priceFrom) &&
            (!priceTo || product.price <= +priceTo) &&
            (!rating || Math.floor(product.ratingValue) === rating) &&
            (!storeIds?.length || product.storeIds.some(storeId => storeIds.includes(storeId)))
          ))
      }
    ),
    tap(() => {
      this.setPage(1)
    })
  );

  readonly sortedProducts$: Observable<ProductModel[]> = combineLatest([
    this.products$,
    this.sortingForm.valueChanges.pipe(
      startWith({ value: '', property: '' }),
    ),
  ]).pipe(
    map(([products, order]) => (
      products.sort((a, b) => {
        const {value, property}: { value: string, property: keyof ProductModel } = order;
        return value === 'asc' ? +a[property] - +b[property] :
          (value === 'desc' ? +b[property] - +a[property] : 0);
      }))
    ),
    tap(() => {
      this.setPage(1)
    })
  );

  readonly displayedProducts$: Observable<ProductModel[]> = combineLatest([
    this.sortedProducts$,
    this.queryParams$,
  ]).pipe(
    map(([products, params]) => {
        const sliceStart = params.itemsPerPage * (params.page - 1);
        return products.slice(sliceStart, sliceStart + params.itemsPerPage);
      }
    )
  );

  // pagination

  readonly itemsPerPageValues$: Observable<number[]> = of([5, 10, 15]);

  readonly paginationForm: FormGroup = new FormGroup({
    itemsPerPage: new FormControl(),
    page: new FormControl(),
  });

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
    private _categoriesStoreService: CategoriesStoreService,
    private _productsStoreService: ProductsStoreService,
    private _storesStoreService: StoresStoreService,
    private _categoriesService: CategoriesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    ) {}

  public setItemsPerPage(value: number): void {
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

  public setPage(value: number): void {
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

  public updateSelectedStores(storeId: string, event: any) {
    const selectedStores = this._selectedStoresSubject.value;

    if (event.target.checked && !selectedStores.includes(storeId)) {
      this._selectedStoresSubject.next([...selectedStores, storeId]);
    }

    if (!event.target.checked && selectedStores.includes(storeId)) {
      this._selectedStoresSubject.next(selectedStores.filter(a => a !== storeId));
    }
  }
}
