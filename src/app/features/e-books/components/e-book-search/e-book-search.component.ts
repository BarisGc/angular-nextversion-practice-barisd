import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-e-book-search',
  templateUrl: './e-book-search.component.html',
  styleUrls: ['./e-book-search.component.scss'],
})
export class EBookSearchComponent {
  @Input() query = '';
  @Input() searching = false;
  @Input() error = '';
  @Output() search = new EventEmitter<string>();

  bySearch(event: KeyboardEvent): void {
    const keyBoardValue = (event.target as HTMLInputElement).value;

    this.query = keyBoardValue.trimStart();
    this.search.emit(keyBoardValue.trimStart());
  }
}
