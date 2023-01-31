import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { ProductModel } from "../models/product.model";
import { ProductsService } from "./products.service";

@Injectable()
export class ProductsStoreService {
  private _productsSubject: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);

  public products$: Observable<ProductModel[]> = this._productsSubject.asObservable();

  constructor(private _productsService: ProductsService) {}

  get getProducts(): ProductModel[] {
    return this._productsSubject.getValue();
  }

  public loadProducts(): void {
    this._productsService.getAllProducts().subscribe(data => {
      this._productsSubject.next(data);
    });
  }
}
