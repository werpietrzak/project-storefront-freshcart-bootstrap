import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  styleUrls: ['./wishlist.component.scss'],
  templateUrl: './wishlist.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistComponent {
}
