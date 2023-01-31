import { Component } from '@angular/core';
import { CategoriesStoreService } from "./services/categories-store.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public _categoriesStoreService: CategoriesStoreService,
  ) {}

  ngOnInit() {
    this._categoriesStoreService.loadCategories();
  }
}
