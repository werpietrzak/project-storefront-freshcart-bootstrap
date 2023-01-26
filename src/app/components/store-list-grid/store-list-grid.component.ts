import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { map, Observable } from "rxjs";
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
  readonly stores$: Observable<StoreQueryModel[]> = this._storesService.getAllStores().pipe(
    map(stores => stores.map(store => ({
      name: store.name,
      logoUrl: store.logoUrl,
      distance: +(store.distanceInMeters / 1000).toFixed(1),
      tagIds: store.tagIds,
      id: store.id,
    })))
  );

  constructor(private _storesService: StoresService) {}
}
