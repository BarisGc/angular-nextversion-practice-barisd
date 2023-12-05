import { EBookCollectionService } from './../../services/e-book-collection.service';
import { Component, Input, inject, OnDestroy, ViewChild } from '@angular/core';
import { EBook } from '../../models/e-book.model';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription, take, tap } from 'rxjs';
@Component({
  selector: 'app-e-book-collection-table',
  templateUrl: './e-book-collection-table.component.html',
  styleUrls: ['./e-book-collection-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class EBookCollectionTableComponent {
  eBookCollectionService = inject(EBookCollectionService);
  @ViewChild(MatTable) table!: MatTable<any>;

  @Input() collectedEBooks!: EBook[];

  // Mat Table
  dataSource = new MatTableDataSource<DataColumn>([]);
  columnsToDisplay: ColumnsToDisplay = [
    ColumnName.Id,
    ColumnName.Title,
    ColumnName.Authors,
    ColumnName.Publisher,
  ];
  columnsToDisplayWithAdditions = [
    ...this.columnsToDisplay,
    'read',
    'expand',
    'delete',
  ];
  expandedElement!: DataColumn | null;
  selection = new SelectionModel<DataColumn>(true, []);

  masterSubscription = new Subscription();

  ngOnInit() {
    this.setInitialState();
  }

  setInitialState() {
    this.setMatTable();
  }

  setMatTable() {
    this.getDataSource();
    this.getReadBooks();
  }

  getDataSource() {
    this.dataSource.data = this.collectedEBooks.map((eBook) => {
      let reFactoredEBookElement: DataColumn = {
        id: eBook.id,
        title: '',
        authors: '',
        publisher: '',
        description: '',
        thumbnail: '',
      };
      for (let [key, value] of Object.entries(eBook.volumeInfo)) {
        switch (key) {
          case ColumnName.Title:
          case ColumnName.Publisher:
          case ColumnName.Description: {
            reFactoredEBookElement = {
              ...reFactoredEBookElement,
              [key]: value,
            };
            break;
          }
          case ColumnName.Authors: {
            const reFormattedValue = (value as string[]).join(' - ');
            reFactoredEBookElement = {
              ...reFactoredEBookElement,
              [key]: reFormattedValue,
            };
            break;
          }
          case 'imageLinks': {
            const reFormattedValue = value as {
              thumbnail: string;
              smallThumbnail: string;
            };
            reFactoredEBookElement = {
              ...reFactoredEBookElement,
              [ColumnName.ThumbnailLink]: reFormattedValue.thumbnail,
            };
            break;
          }
        }
      }
      return reFactoredEBookElement;
    });
  }

  clearAllCollections() {
    const clearStream = this.eBookCollectionService
      .clearAllCollections()
      .subscribe(() => {
        this.dataSource.data = [];
        this.selection.clear();
        this.table.renderRows();
      });
    this.masterSubscription.add(clearStream);
  }

  removeFromCollection(element: any) {
    const removeStream = this.eBookCollectionService
      .removeEBooks([element.id])
      .pipe()
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(
          (item) => item.id !== element.id
        );
        this.table.renderRows();
      });
    this.masterSubscription.add(removeStream);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: DataColumn): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  getReadBooks() {
    this.eBookCollectionService
      .getReadBooksFromLocalStorage()
      .pipe(take(1))
      .subscribe();

    const getReadBooksStream$ = this.eBookCollectionService.readBooksIds$
      .pipe(
        tap((ids) => {
          this.selection.clear();
          this.selection.select(
            ...this.dataSource.data.filter((item) => ids.includes(item.id))
          );
        })
      )
      .subscribe();

    this.masterSubscription.add(getReadBooksStream$);
  }

  saveReadEBooks() {
    const readBooksIds = this.selection.selected.map((selected) => selected.id);
    this.eBookCollectionService
      .setReadBooks(readBooksIds)
      .pipe(take(1))
      .subscribe();
  }

  OnDestroy() {
    this.masterSubscription.unsubscribe();
  }
}

enum ColumnName {
  Id = 'id',
  Title = 'title',
  Authors = 'authors',
  Publisher = 'publisher',
  Description = 'description',
  ThumbnailLink = 'thumbnail',
}

type ColumnsToDisplay = ColumnName[];
interface DataColumn {
  [ColumnName.Id]: string;
  [ColumnName.Title]: string;
  [ColumnName.Authors]: string;
  [ColumnName.Publisher]: string;
  [ColumnName.Description]: string;
  [ColumnName.ThumbnailLink]: string;
}
