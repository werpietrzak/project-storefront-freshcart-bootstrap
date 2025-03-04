import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { ProductModel } from "../models/product.model";

@Injectable()
export class ProductsService {
  constructor(private _httpClient: HttpClient) {}

  public getAllProducts(): Observable<ProductModel[]> {
    return this._httpClient.get<ProductModel[]>(
      'https://6384fca14ce192ac60696c4b.mockapi.io/freshcart-products'
    ).pipe(
      map(products => products.map(
        product => ({
          ...product,
          imageUrl: product.imageUrl.substring(1),
        })
      ))
    );
  }
}
