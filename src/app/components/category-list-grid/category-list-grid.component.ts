import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable } from "rxjs";
import { CategoryModel } from "../../models/category.model";
import { CategoriesService } from "../../services/categories.service";

@Component({
  selector: 'app-category-list-grid',
  styleUrls: ['./category-list-grid.component.scss'],
  templateUrl: './category-list-grid.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListGridComponent {
  readonly categories$: Observable<CategoryModel[]> = this._categoriesService.getAllCategories();

  constructor(private _categoriesService: CategoriesService) {}
}
