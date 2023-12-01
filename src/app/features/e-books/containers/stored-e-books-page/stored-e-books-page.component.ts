import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EBook } from '../../models/e-book.model';
import { EBookDataService } from '../../services/e-book-data.service';

@Component({
  selector: 'app-stored-e-books-page',
  templateUrl: './stored-e-books-page.component.html',
  styleUrls: ['./stored-e-books-page.component.scss'],
})
export class StoredEBooksPageComponent {
  eBooks$!: Observable<EBook[]>;

  previewEBookRelativeUrl = '../view';

  constructor(private eBookDataService: EBookDataService) {}

  ngOnInit() {
    this.getInitialState();
  }

  getInitialState() {
    this.eBooks$ = this.eBookDataService.eBooks$;
  }
}
