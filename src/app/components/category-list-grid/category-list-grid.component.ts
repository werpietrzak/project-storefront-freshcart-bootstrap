import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable } from "rxjs";
import { CategoryModel } from "../../models/category.model";
import { CategoriesStoreService } from "../../services/categories-store.service";

@Component({
  selector: 'app-category-list-grid',
  styleUrls: ['./category-list-grid.component.scss'],
  templateUrl: './category-list-grid.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListGridComponent {
  readonly categories$: Observable<CategoryModel[]> = this._categoriesStoreService.categories$;

  constructor(private _categoriesStoreService: CategoriesStoreService) {}
}
