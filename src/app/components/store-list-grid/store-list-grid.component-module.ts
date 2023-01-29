import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreListGridComponent } from './store-list-grid.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [StoreListGridComponent],
  providers: [],
  exports: [StoreListGridComponent]
})
export class StoreListGridComponentModule {
}
