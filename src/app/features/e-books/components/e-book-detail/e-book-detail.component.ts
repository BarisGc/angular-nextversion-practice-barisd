import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EBook } from '../../models/e-book.model';

@Component({
  selector: 'app-e-book-detail',
  templateUrl: './e-book-detail.component.html',
  styleUrls: ['./e-book-detail.component.scss'],
})
export class EBookDetailComponent {
  /**
   * Presentational components receive data through @Input() and communicate events
   * through @Output() but generally maintain no internal state of their
   * own. All decisions are delegated to 'container', or 'smart'
   * components before data updates flow back down.
   *
   * More on 'smart' and 'presentational' components: https://gist.github.com/btroncone/a6e4347326749f938510#utilizing-container-components
   */
  @Input() eBook!: EBook;
  @Input() inCollection!: boolean;
  @Output() add = new EventEmitter<EBook>();
  @Output() remove = new EventEmitter<EBook>();

  /**
   * Tip: Utilize getters to keep templates clean
   */
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

  get thumbnail() {
    return (
      this.eBook.volumeInfo.imageLinks &&
      this.eBook.volumeInfo.imageLinks.smallThumbnail &&
      this.eBook.volumeInfo.imageLinks.smallThumbnail.replace('http:', '')
    );
  }
}
