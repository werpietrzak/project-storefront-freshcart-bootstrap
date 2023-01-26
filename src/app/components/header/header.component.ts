import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CategoriesService } from "../../services/categories.service";
import { BehaviorSubject, Observable } from "rxjs";
import { CategoryModel } from "../../models/category.model";

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private _mobileMenuToggleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public mobileMenuToggle$: Observable<boolean> = this._mobileMenuToggleSubject.asObservable();

  readonly categories$: Observable<CategoryModel[]> = this._categoriesService.getAllCategories();

  constructor(private _categoriesService: CategoriesService) {}

  toggleMenu(): void {
    this._mobileMenuToggleSubject.next(!this._mobileMenuToggleSubject.value);
  }
}
