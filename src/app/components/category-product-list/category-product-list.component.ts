import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable, switchMap } from "rxjs";
import { CategoryModel } from "../../models/category.model";
import { CategoriesService } from "../../services/categories.service";
import { ActivatedRoute } from "@angular/router";

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

  constructor(
    private _categoriesService: CategoriesService,
    private _activatedRoute: ActivatedRoute,
    ) {}
}
