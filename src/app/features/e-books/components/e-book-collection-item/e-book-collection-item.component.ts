import { Component, Input } from '@angular/core';
import { EBook } from '../../models/e-book.model';

@Component({
  selector: 'app-e-book-collection-item',
  templateUrl: './e-book-collection-item.component.html',
  styleUrls: ['./e-book-collection-item.component.scss'],
})
export class EBookCollectionItemComponent {
  @Input() item!: EBook;
}
// <!-- Not necessary -->
