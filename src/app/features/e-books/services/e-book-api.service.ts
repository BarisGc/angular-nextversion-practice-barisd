import { ToastrService } from 'ngx-toastr';
import { GoogleEBooksService } from './google-e-books.service';
import { Injectable } from '@angular/core';
import { EBookDataService } from './e-book-data.service';
import { Observable, catchError, finalize, of, tap } from 'rxjs';
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
        return of([]);
      })
    );
    // const newState =
    //   query === ''
    //     ? {
    //         ids: [],
    //         loading: false,
    //         error: '',
    //         query,
    //       }
    //     : {
    //         ...this.eBookSearchState.getValue(),
    //         loading: true,
    //         error: '',
    //         query,
    //       };

    // this.eBookDataService.setEBooks(newState)
  }

  reqSuccess(eBooks: EBook[]) {
    this.eBookDataService.setEBooks(eBooks);
  }

  reqFailure(errorMsg: string) {
    this.toastrService.error(errorMsg);
  }
}
