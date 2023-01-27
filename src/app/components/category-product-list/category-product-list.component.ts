import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable } from "rxjs";
import { CategoryModel } from "../../models/category.model";
import { CategoriesService } from "../../services/categories.service";

@Component({
  selector: 'app-category-product-list',
  styleUrls: ['./category-product-list.component.scss'],
  templateUrl: './category-product-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryProductListComponent {
  readonly categories$: Observable<CategoryModel[]> = this._categoriesService.getAllCategories();

  constructor(private _categoriesService: CategoriesService) {}
}
