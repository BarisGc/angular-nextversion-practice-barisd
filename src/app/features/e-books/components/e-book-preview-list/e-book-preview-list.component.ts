import { Component, Input, SimpleChanges } from '@angular/core';
import { EBook } from '../../models/e-book.model';

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
