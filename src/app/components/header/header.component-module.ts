import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [HeaderComponent],
  providers: [],
  exports: [HeaderComponent]
})
export class HeaderComponentModule {}
