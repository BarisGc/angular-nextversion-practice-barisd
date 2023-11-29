import { Component, Input } from '@angular/core';
import { EBook } from '../../models/e-book.model';

@Component({
  selector: 'app-e-book-authors',
  templateUrl: './e-book-authors.component.html',
  styleUrls: ['./e-book-authors.component.scss'],
})
export class EBookAuthorsComponent {
  @Input() eBook!: EBook;

  get authors() {
    return this.eBook.volumeInfo.authors;
  }
}
