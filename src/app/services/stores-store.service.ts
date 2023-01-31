import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { StoreModel } from "../models/store.model";
import { StoresService } from "./stores.service";

@Injectable()
export class StoresStoreService {
  private _storesSubject: BehaviorSubject<StoreModel[]> = new BehaviorSubject<StoreModel[]>([]);

  public stores$: Observable<StoreModel[]> = this._storesSubject.asObservable();

  constructor(private _storesService: StoresService) {}

  get getStores(): StoreModel[] {
    return this._storesSubject.getValue();
  }

  public loadStores(): void {
    this._storesService.getAllStores().subscribe(data => {
      this._storesSubject.next(data);
    });
  }
}
