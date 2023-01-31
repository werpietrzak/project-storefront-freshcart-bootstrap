import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { combineLatest, map, Observable } from "rxjs";
import { StoreQueryModel } from "../../queryModels/store-query.model";
import { StoresStoreService } from "../../services/stores-store.service";

@Component({
  selector: 'app-store-list-grid',
  styleUrls: ['./store-list-grid.component.scss'],
  templateUrl: './store-list-grid.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreListGridComponent {
  readonly stores$: Observable<StoreQueryModel[]> = combineLatest([
    this._storesStoreService.stores$,
    this._storesStoreService.storeTags$,
  ]).pipe(
    map(([stores, tags]) => stores.map(store => {
      const tagsMap = tags.reduce((acc, cur) => {
        acc[cur.id] = cur.name;
        return acc;
      }, {} as { [id: string]: string });
      return {
        name: store.name,
        logoUrl: store.logoUrl,
        distance: +(store.distanceInMeters / 1000).toFixed(1),
        tagIds: store.tagIds.map(tagId => tagsMap[tagId]),
        id: store.id,
      }
    }))
  );

  constructor(private _storesStoreService: StoresStoreService) {}
}
