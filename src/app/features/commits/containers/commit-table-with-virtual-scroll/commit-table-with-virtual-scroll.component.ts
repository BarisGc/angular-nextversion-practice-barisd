import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTableModule } from '@angular/material/table';
import { Component, inject, DestroyRef } from '@angular/core';
import {
  TableVirtualScrollDataSource,
  TableVirtualScrollModule,
} from 'ng-table-virtual-scroll';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommitService } from '../../services/commit.service';
import { MatSortModule, SortDirection } from '@angular/material/sort';
import { of, tap } from 'rxjs';
import { GithubIssue } from '../../models/commit';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-commit-table-with-virtual-scroll',
  standalone: true,
  templateUrl: './commit-table-with-virtual-scroll.component.html',
  styleUrl: './commit-table-with-virtual-scroll.component.scss',
  imports: [
    ScrollingModule,
    MatTableModule,
    TableVirtualScrollModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
})
export class CommitTableWithVirtualScrollComponent {
  dataSource = new TableVirtualScrollDataSource<GithubIssue>([]);
  columns = this.setColumns();
  displayedColumns: string[] = this.setDisplayedColumns();
  pageIndex = 0;
  pageSize = 30;
  sortType = 'created';
  sortOrder: SortDirection = 'desc';
  itemSize = 100;
  isLoadingResults = false;
  isRateLimitReached = false;

  private commitService = inject(CommitService);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.setInitialState();
  }

  setInitialState() {
    this.loadData();
  }

  private loadData(): void {
    this.isLoadingResults = true;
    this.commitService
      .getRepoIssues(this.sortType, this.sortOrder, this.pageIndex, this.itemSize)
      .pipe(
        tap((data) => {
          this.pageIndex++;
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;
          if (data === null) {
            this.dataSource.data = [];
            return;
          }

          const reformattedData = data.items.map((item, index) => {
            return {
              ...item,
              // for testing purpose
              rowNo: `${this.dataSource.data.length + index}`,
            };
          });

          this.dataSource.data = [...this.dataSource.data, ...reformattedData];
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  setDisplayedColumns() {
    return this.setColumns().map((c) => c.columnDef);
  }

  setColumns() {
    const columns = [
      {
        columnDef: 'rowNo',
        header: 'Row No',
        cell: (element: GithubIssue & { rowNo: string }) => `${element.rowNo}`,
      },
      {
        columnDef: 'created',
        header: 'Created',
        cell: (element: GithubIssue & { rowNo: string }) =>
          `${element.created_at}`,
      },
      {
        columnDef: 'state',
        header: 'State',
        cell: (element: GithubIssue & { rowNo: string }) => `${element.state}`,
      },
      {
        columnDef: 'number',
        header: '#',
        cell: (element: GithubIssue & { rowNo: string }) => `${element.number}`,
      },
      {
        columnDef: 'title',
        header: 'Title',
        cell: (element: GithubIssue) => `${element.title}`,
      },
    ];
    return columns;
  }
}
