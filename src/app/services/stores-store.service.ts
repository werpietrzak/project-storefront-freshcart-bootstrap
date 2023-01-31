import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { StoreModel } from "../models/store.model";
import { StoresService } from "./stores.service";
import { StoreTagModel } from "../models/store-tag.model";

@Injectable()
export class StoresStoreService {
  private _storesSubject: BehaviorSubject<StoreModel[]> = new BehaviorSubject<StoreModel[]>([]);

  public stores$: Observable<StoreModel[]> = this._storesSubject.asObservable();

  private _storeTagsSubject: BehaviorSubject<StoreTagModel[]> = new BehaviorSubject<StoreTagModel[]>([]);

  public storeTags$: Observable<StoreTagModel[]> = this._storeTagsSubject.asObservable();

  constructor(private _storesService: StoresService) {}

  public loadStores(): void {
    this._storesService.getAllStores().subscribe(data => {
      this._storesSubject.next(data);
    });
  }

  public loadStoreTags(): void {
    this._storesService.getAllStoreTags().subscribe(data => {
      this._storeTagsSubject.next(data);
    });
  }
}
