import { Observable } from 'rxjs';
import { EBookCollectionService } from '../../services/e-book-collection-data.service';
import { Component, OnInit } from '@angular/core';
import { EBook } from '../../models/e-book.model';
import { EBookDataService } from '../../services/e-book-data.service';
@Component({
  selector: 'app-e-book-collection-page',
  templateUrl: './e-book-collection-page.component.html',
  styleUrls: ['./e-book-collection-page.component.scss'],
})
export class EBookCollectionPageComponent implements OnInit {
  collectedEBooks$!: Observable<EBook[]>;
  constructor(
    private eBookCollectionService: EBookCollectionService,
    private eBookDataService: EBookDataService
  ) {}

  ngOnInit(): void {
    this.checkIsCollectionStoraged();
    this.getCollectedEBooks();
  }

  getCollectedEBooks() {
    this.collectedEBooks$ = this.eBookCollectionService.collectedEBooks$;
  }
  checkIsCollectionStoraged() {
    this.eBookCollectionService.loadCollection();
  }
}
