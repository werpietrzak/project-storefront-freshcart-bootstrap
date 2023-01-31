import { Component } from '@angular/core';
import { CategoriesStoreService } from "./services/categories-store.service";
import { ProductsStoreService } from "./services/products-store.service";
import { StoresStoreService } from "./services/stores-store.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public _categoriesStoreService: CategoriesStoreService,
    public _productsStoreService: ProductsStoreService,
    public _storesStoreService: StoresStoreService,
  ) {}

  ngOnInit() {
    this._categoriesStoreService.loadCategories();
    this._productsStoreService.loadProducts();
    this._storesStoreService.loadStores();
    this._storesStoreService.loadStoreTags();
  }
}
