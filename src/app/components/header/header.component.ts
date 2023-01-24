import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CategoriesService } from "../../services/categories.service";
import { Observable } from "rxjs";
import { CategoryModel } from "../../models/category.model";

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  readonly categories$: Observable<CategoryModel[]> = this._categoriesService.getCategories();

  constructor(private _categoriesService: CategoriesService) {}
}
