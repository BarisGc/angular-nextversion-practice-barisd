import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EBook } from '../models/e-book.model';

@Injectable({
  providedIn: 'root',
})
export class GoogleEBooksService {
  private API_PATH = 'https://www.googleapis.com/books/v1/volumes';
  // private dummyApi =
  //   'https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=Marijn%20Haverbeke';

  constructor(private http: HttpClient) {}

  // TODO: "%20" necessary?
  searchBooks(queryTitle = ''): Observable<EBook[]> {
    return this.http
      .get<{ items: EBook[] }>(
        `${this.API_PATH}?orderBy=newest&q=${queryTitle}`
      )
      .pipe(map((books) => books.items || []));
  }

  retrieveBook(volumeId: string): Observable<EBook> {
    return this.http.get<EBook>(`${this.API_PATH}/${volumeId}`);
  }
}
