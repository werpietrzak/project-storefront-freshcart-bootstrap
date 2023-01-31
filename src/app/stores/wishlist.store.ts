import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class WishlistStore {
  readonly productsIdsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  readonly productsIds$: Observable<string[]> = this.productsIdsSubject.asObservable();
}
