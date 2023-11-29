import { Component, Input } from '@angular/core';
import { EBook } from '../../models/e-book.model';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
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
  @Input() collectedEBooks!: EBook[];

  // Mat Table
  dataSource!: AllColumns[];
  columnsToDisplay: ColumnsToDisplay = [
    ColumnName.Id,
    ColumnName.Title,
    ColumnName.Authors,
    ColumnName.Publisher,
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: AllColumns | null;

  ngOnInit() {
    this.dataSource = this.collectedEBooks.map((eBook) => {
      let reFactoredEBookElement: AllColumns = {
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
interface AllColumns {
  [ColumnName.Id]: string;
  [ColumnName.Title]: string;
  [ColumnName.Authors]: string;
  [ColumnName.Publisher]: string;
  [ColumnName.Description]: string;
  [ColumnName.ThumbnailLink]: string;
}
