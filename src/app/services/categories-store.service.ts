import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { CategoryModel } from "../models/category.model";
import { CategoriesService } from "./categories.service";

@Injectable()
export class CategoriesStoreService {
  private _categoriesSubject: BehaviorSubject<CategoryModel[]> = new BehaviorSubject<CategoryModel[]>([]);

  public categories$: Observable<CategoryModel[]> = this._categoriesSubject.asObservable();

  constructor(private _categoriesService: CategoriesService) {}

  get getCategories(): CategoryModel[] {
    return this._categoriesSubject.getValue();
  }

  public loadCategories(): void {
    this._categoriesService.getAllCategories().subscribe(data => {
      this._categoriesSubject.next(data);
    });
  }
}
