import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { combineLatest, map, Observable } from "rxjs";
import { StoreQueryModel } from "../../models/store.model";
import { StoresService } from "../../services/stores.service";

@Component({
  selector: 'app-store-list-grid',
  styleUrls: ['./store-list-grid.component.scss'],
  templateUrl: './store-list-grid.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreListGridComponent {
  readonly stores$: Observable<StoreQueryModel[]> = combineLatest([
    this._storesService.getAllStores(),
    this._storesService.getAllStoreTags(),
  ]).pipe(
    map(([stores, tags]) => stores.map(store => ({
      name: store.name,
      logoUrl: store.logoUrl,
      distance: +(store.distanceInMeters / 1000).toFixed(1),
      tagIds: store.tagIds.map(tag => tags.find(a => a.id === tag)?.name || ''),
      id: store.id,
    })))
  );

  constructor(private _storesService: StoresService) {}
}
