import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { CartItemModel } from "../models/cart-item.model";

@Injectable()
export class CartStoreService {
  private _cartProductsSubject: BehaviorSubject<CartItemModel[]> = new BehaviorSubject<CartItemModel[]>([]);

  public cartProducts$: Observable<CartItemModel[]> = this._cartProductsSubject.asObservable();
}
