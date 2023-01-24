import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./components/homepage/homepage.component";
import {HomepageComponentModule} from "./components/homepage/homepage.component-module";
import {CategoryProductListComponent} from "./components/category-product-list/category-product-list.component";
import {
  CategoryProductListComponentModule
} from "./components/category-product-list/category-product-list.component-module";
import {StoreProductListComponent} from "./components/store-product-list/store-product-list.component";
import {StoreProductListComponentModule} from "./components/store-product-list/store-product-list.component-module";

const routes: Routes = [
  { path: '/', component: HomepageComponent },
  { path: '/categories/:categoryId', component: CategoryProductListComponent },
  { path: '/stores/:storeId', component: StoreProductListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule,
    HomepageComponentModule,
    CategoryProductListComponentModule,
    StoreProductListComponentModule,
  ],
})
export class AppRoutingModule {}
