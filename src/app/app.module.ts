import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponentModule } from './components/header/header.component-module';
import { CategoriesServiceModule } from './services/categories.service-module';
import { FooterComponentModule } from './components/footer/footer.component-module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { StoresServiceModule } from "./services/stores.service-module";
import { CategoriesStoreServiceModule } from "./services/categories-store.service-module";
import { ProductsServiceModule } from "./services/products.service-module";
import { CategoriesStoreServiceModule } from "./services/categories-store.service-module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CollapseModule,
    CommonModule,
    RouterModule,
    HeaderComponentModule,
    CategoriesServiceModule,
    FooterComponentModule,
    StoresServiceModule,
    CategoriesStoreServiceModule,
    ProductsServiceModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
