import { EBook } from '@example-app/features/e-books/models/e-book.model';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-e-book-preview-list',
  templateUrl: './e-book-preview-list.component.html',
  styleUrls: ['./e-book-preview-list.component.scss'],
})
export class EBookPreviewListComponent {
  @Input() eBooks: EBook[] = [];
  @Input() relativeUrl!: string;

  ngOnInit(): void {}
}
