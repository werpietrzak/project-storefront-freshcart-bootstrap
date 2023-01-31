import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class WishlistStoreService {
  private _productsIdsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  readonly productsIds$: Observable<string[]> = this._productsIdsSubject.asObservable();

  get getWishlistItemsIds(): string[] {
    return this._productsIdsSubject.getValue();
  }

  public updateWishlist(data: string[]): void {
    this._productsIdsSubject.next(data);
  }
}
