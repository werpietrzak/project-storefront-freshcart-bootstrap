import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CategoryModel } from "../models/category.model";

@Injectable()
export class CategoriesService {
  constructor(private _httpClient: HttpClient) {}

  getCategories(): Observable<CategoryModel[]> {
    return this._httpClient.get<CategoryModel[]>('https://6384fca14ce192ac60696c4b.mockapi.io/freshcart-categories');
  }
}
