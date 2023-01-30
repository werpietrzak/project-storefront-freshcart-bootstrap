import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ProductsService } from "../../services/products.service";
import { ActivatedRoute } from "@angular/router";
import { combineLatest, map, Observable, switchMap } from "rxjs";
import { StoreModel } from "../../models/store.model";
import { StoresService } from "../../services/stores.service";
import { ProductModel } from "../../models/product.model";
import { ProductWithNameImageQueryModel } from "../../queryModels/productWithNameImage.model";

@Component({
  selector: 'app-store-product-list',
  styleUrls: ['./store-product-list.component.scss'],
  templateUrl: './store-product-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreProductListComponent {
  readonly store$: Observable<StoreModel> = this._activatedRoute.params.pipe(
    switchMap(param => this._storesService.getOneStore(param['storeId']))
  );

  readonly products$: Observable<ProductWithNameImageQueryModel[]> = combineLatest([
    this.store$,
    this._productsService.getAllProducts(),
  ]).pipe(
    map(([store, products]) => products.reduce(
      (acc: ProductWithNameImageQueryModel[], curr: ProductModel) => (
        curr.storeIds.includes(store.id) ? [...acc, {
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
