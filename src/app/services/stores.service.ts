import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { StoreModel } from "../models/store.model";
import { StoreTagModel } from "../models/store-tag.model";

@Injectable()
export class StoresService {
  constructor(private _httpClient: HttpClient) {}

  public getAllStores(): Observable<StoreModel[]> {
    return this._httpClient.get<StoreModel[]>('https://6384fca14ce192ac60696c4b.mockapi.io/freshcart-stores')
      .pipe(
        map(stores => stores.map(
          store => ({
            ...store,
            logoUrl: store.logoUrl.substring(1),
          })
        ))
      );
  }

  public getOneStore(storeId: string): Observable<StoreModel> {
    return this._httpClient.get<StoreModel>(
      `https://6384fca14ce192ac60696c4b.mockapi.io/freshcart-stores/${storeId}`
    ).pipe(
      map(store => ({
          ...store,
          logoUrl: store.logoUrl.substring(1),
        })
      )
    );
  }

  public getAllStoreTags(): Observable<StoreTagModel[]> {
    return this._httpClient.get<StoreTagModel[]>('https://6384fca14ce192ac60696c4b.mockapi.io/freshcart-store-tags');
  }
}
