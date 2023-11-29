import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { EBook } from '../../models/e-book.model';

@Component({
  selector: 'app-e-book-preview',
  templateUrl: './e-book-preview.component.html',
  styleUrls: ['./e-book-preview.component.scss'],
})
export class EBookPreviewComponent {
  @Input() eBook!: EBook;
  @Input() relativeUrl!: string;

  get id() {
    return this.eBook.id;
  }

  get title() {
    return this.eBook.volumeInfo.title;
  }

  get subtitle() {
    return this.eBook.volumeInfo.subtitle;
  }

  get description() {
    return this.eBook.volumeInfo.description;
  }

  get thumbnail(): string | boolean {
    if (this.eBook.volumeInfo.imageLinks) {
      return this.eBook.volumeInfo.imageLinks.smallThumbnail.replace(
        'http:',
        ''
      );
    }

    return false;
  }
}
