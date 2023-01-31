import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable, of } from "rxjs";

@Component({
  selector: 'app-homepage',
  styleUrls: ['./homepage.component.scss'],
  templateUrl: './homepage.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageComponent {
  readonly featuredCategoriesIds$: Observable<string[]> = of(['5', '2']);
}
