import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [FooterComponent],
  providers: [],
  exports: [FooterComponent]
})
export class FooterComponentModule {
}
