import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { CategoryModel } from "../models/category.model";

@Injectable()
export class CategoriesService {
  constructor(private _httpClient: HttpClient) {}

  public getAllCategories(): Observable<CategoryModel[]> {
    return this._httpClient.get<CategoryModel[]>(
      'https://6384fca14ce192ac60696c4b.mockapi.io/freshcart-categories'
    ).pipe(
      map(categories => categories.map(
        category => ({
          ...category,
          imageUrl: category.imageUrl.substring(1),
        })
      ))
    );
  }

  public getOneCategory(categoryId: string): Observable<CategoryModel> {
    return this._httpClient.get<CategoryModel>(
      `https://6384fca14ce192ac60696c4b.mockapi.io/freshcart-categories/${categoryId}`
    ).pipe(
      map(category => ({
          ...category,
          imageUrl: category.imageUrl.substring(1),
        })
      )
    );
  }
}
