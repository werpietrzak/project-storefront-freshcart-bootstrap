import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ProductsService } from "../../services/products.service";
import { ActivatedRoute } from "@angular/router";
import { combineLatest, debounceTime, map, Observable, startWith, switchMap } from "rxjs";
import { StoresService } from "../../services/stores.service";
import { ProductModel } from "../../models/product.model";
import { ProductWithNameImageQueryModel } from "../../queryModels/product-with-name-image.model";
import {FormControl} from "@angular/forms";
import {StoreQueryModel} from "../../queryModels/store-query.model";

@Component({
  selector: 'app-store-product-list',
  styleUrls: ['./store-product-list.component.scss'],
  templateUrl: './store-product-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreProductListComponent {
  readonly searchForm: FormControl = new FormControl('');

  readonly store$: Observable<StoreQueryModel> = this._activatedRoute.params.pipe(
    switchMap(param => this._storesService.getOneStore(param['storeId'])),
    map(store => ({
      name: store.name,
      logoUrl: store.logoUrl,
      distance: +(store.distanceInMeters / 1000).toFixed(1),
      tagIds: store.tagIds,
      id: store.id,
    }))
  );

  readonly products$: Observable<ProductWithNameImageQueryModel[]> = combineLatest([
    this.store$,
    this._productsService.getAllProducts(),
    this.searchForm.valueChanges.pipe(startWith('')),
  ]).pipe(
    debounceTime(500),
    map(([store, products, query]) => products.reduce(
      (acc: ProductWithNameImageQueryModel[], curr: ProductModel) => (
        curr.storeIds.includes(store.id) && curr.name.toLowerCase().includes(query.toLowerCase()) ? [...acc, {
          name: curr.name,
          imageUrl: curr.imageUrl,
          id: curr.id,
        }] : acc
      ), [])
    )
  );

  constructor(
    private _storesService: StoresService,
    private _productsService: ProductsService,
    private _activatedRoute: ActivatedRoute,
    ) {}
}
