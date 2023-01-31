import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable, of } from "rxjs";
import { CategoryModel } from "../../models/category.model";
import { StoreModel } from "../../models/store.model";
import { CategoriesStoreService } from "../../services/categories-store.service";
import { StoresStoreService } from "../../services/stores-store.service";

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  readonly categories$: Observable<CategoryModel[]> = this._categoriesStoreService.categories$;

  readonly stores$: Observable<StoreModel[]> = this._storesStoreService.stores$;

  readonly getToKnowUs$: Observable<string[]> = of([
    'Company',
    'About',
    'Blog',
    'Help Center',
    'Our Value',
  ]);

  constructor(
    private _categoriesStoreService: CategoriesStoreService,
    private _storesStoreService: StoresStoreService,
  ) {}
}
