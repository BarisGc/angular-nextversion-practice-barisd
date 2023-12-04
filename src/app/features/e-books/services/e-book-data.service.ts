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

  get _eBooks(): EBook[] {
    return this.eBooksSub.getValue();
  }

  constructor() {}

  setEBooks(newEBooks: EBook[]) {
    // const combinedUniqueEBooks = Array.from(
    //   new Set([...this.eBooksSub.getValue(), ...eBooks])
    // );

    const combinedArray = [...this._eBooks, ...newEBooks];
    const uniqueArray = Array.from(
      new Map(combinedArray.map((item) => [item.id, item])).values()
    );
    this.eBooksSub.next(uniqueArray);
  }

  selectEBook(selectedEBookId: string) {
    const selectedEBook = this._eBooks.find(
      (eBook) => eBook.id === selectedEBookId
    ) as EBook;
    return this.selectedEBookSub.next(selectedEBook);
  }

  unSelectEBook() {
    return this.selectedEBookSub.next(null);
  }

  /**
   * This method is used in a guard to
   * "load a book with the given ID from the API and caches it in the store, returning `true` or `false` if it was found."
   */
  loadEBook(eBook: EBook) {
    this.eBooksSub.next([
      ...this._eBooks.filter((_eBook) => _eBook.id !== eBook.id),
      eBook,
    ]);
    return true;
  }
}
