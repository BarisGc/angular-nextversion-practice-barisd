import { ToastrService } from 'ngx-toastr';
import { GoogleEBooksService } from './google-e-books.service';
import { Injectable } from '@angular/core';
import { EBookDataService } from './e-book-data.service';
import { Observable, catchError, of, tap, EMPTY } from 'rxjs';
import { EBook } from '../models/e-book.model';

@Injectable({
  providedIn: 'root',
})
export class EBookApiService {
  constructor(
    private eBookDataService: EBookDataService,
    private googleEBooksService: GoogleEBooksService,
    private toastrService: ToastrService
  ) {}

  getEBooks(query: string): Observable<EBook[]> {
    return this.googleEBooksService.searchBooks(query).pipe(
      tap((eBooks: EBook[]) => this.reqSuccess(eBooks)),
      catchError((err) => {
        this.reqFailure(err);
        return EMPTY;
      })
    );
  }

  reqSuccess(eBooks: EBook[]) {
    if (eBooks) {
      this.eBookDataService.setEBooks(eBooks);
      return eBooks;
    }
    return this.dataCannotBeFound();
  }

  reqFailure(errorMsg: string) {
    this.toastrService.error(errorMsg);
  }

  dataCannotBeFound() {
    const noData: EBook[] = [];
    this.eBookDataService.setEBooks(noData);
    this.toastrService.warning('No Founded Data');
    return noData;
  }
}
