import { EBookCollectionService } from '../../services/e-book-collection-data.service';
import { EBookDataService } from '../../services/e-book-data.service';
import { Component } from '@angular/core';
import { EBook } from '../../models/e-book.model';
import { concatMap, map, of, tap, Observable } from 'rxjs';

@Component({
  selector: 'app-selected-e-book',
  templateUrl: './selected-e-book.component.html',
  styleUrls: ['./selected-e-book.component.scss'],
})
export class SelectedEBookComponent {
  selectedEBook$!: Observable<EBook | null>;
  collectedEBooks$!: Observable<EBook[] | null>;
  isSelectedBookInCollection$!: Observable<boolean>;

  constructor(
    private eBookDataService: EBookDataService,
    private eBookCollectionService: EBookCollectionService
  ) {}

  ngOnInit() {
    this.getInitialState();
  }

  getInitialState() {
    this.selectedEBook$ = this.eBookDataService.selectedEBook$;

    this.collectedEBooks$ = this.eBookCollectionService.collectedEBooks$;

    const isSelectedEBookInCollection$ = this.collectedEBooks$.pipe(
      concatMap((collectedEBooks) =>
        this.selectedEBook$.pipe(
          map(
            (selectedEBook) =>
              collectedEBooks?.some(
                (collectedEBook) => collectedEBook?.id === selectedEBook?.id
              ) || false
          )
        )
      )
    );

    // TODO: check if the subscription covers other two inner obs
    this.isSelectedBookInCollection$ = isSelectedEBookInCollection$;
  }

  addToCollection(eBook: EBook) {
    this.eBookCollectionService.addEBookToCollection(eBook);
  }

  removeFromCollection(eBook: EBook) {
    this.eBookCollectionService.removeEBookFromCollection(eBook);
  }
}
