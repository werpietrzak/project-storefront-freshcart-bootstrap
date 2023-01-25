import { NgModule } from '@angular/core';
import { StoreListGridComponentModule } from '../store-list-grid/store-list-grid.component-module';
import { StoresServiceModule } from '../../services/stores.service-module';
import { HomepageComponent } from './homepage.component';

@NgModule({
  imports: [StoreListGridComponentModule, StoresServiceModule],
  declarations: [HomepageComponent],
  providers: [],
  exports: [HomepageComponent]
})
export class HomepageComponentModule {
}
