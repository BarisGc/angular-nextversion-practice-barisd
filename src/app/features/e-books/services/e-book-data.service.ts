import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { EBook } from '../models/e-book.model';

@Injectable({
  providedIn: 'root',
})
export class EBookDataService {
  private eBooksSub = new BehaviorSubject<EBook[]>([]);
  private selectedEBookSub = new BehaviorSubject<EBook | null>(null);

  eBooks$ = this.eBooksSub.asObservable();
  selectedEBook$ = this.selectedEBookSub.asObservable();

  constructor() {}

  setEBooks(eBooks: EBook[]) {
    this.eBooksSub.next(eBooks);
  }

  selectEBook(eBook: EBook) {
    return this.selectedEBookSub.next(eBook);
  }

  unSelectEBook() {
    return this.selectedEBookSub.next(null);
  }

  /**
   * This method is used in a guard to
   * "load a book with the given ID from the API and caches it in the store, returning `true` or `false` if it was found."
   */
  loadEBook(eBook: EBook) {
    this.eBooksSub.next([...this.eBooksSub.getValue(), eBook]);
    return true;
  }
}
