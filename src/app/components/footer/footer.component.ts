import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CategoriesService } from "../../services/categories.service";
import { Observable } from "rxjs";
import { CategoryModel } from "../../models/category.model";
import { StoresService } from "../../services/stores.service";
import { StoreModel } from "../../models/store.model";

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  readonly categories$: Observable<CategoryModel[]> = this._categoriesService.getAllCategories();

  readonly stores$: Observable<StoreModel[]> = this._storesService.getAllStores();

  constructor(
    private _categoriesService: CategoriesService,
    private _storesService: StoresService,
  ) {}
}
