import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import {
  merge,
  startWith,
  switchMap,
  catchError,
  EMPTY,
  map,
  tap,
  of,
} from 'rxjs';
import { GithubIssue } from '../../models/commit';
import { CommitService } from '../../services/commit.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, DatePipe } from '@angular/common';
import { SortDirection } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
const PIPES: any = [];
const COMPONENTS: any = [];
const MODULES = [
  MatTableModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatPaginatorModule,
  DatePipe,
  AsyncPipe,
  MatIconModule,
  MatProgressSpinnerModule,
];
const DIRECTIVES: any = [];
@Component({
  selector: 'app-commit-load-more',
  standalone: true,
  templateUrl: './commit-load-more.component.html',
  styleUrl: './commit-load-more.component.scss',
  imports: [...PIPES, ...COMPONENTS, ...MODULES, ...DIRECTIVES],
})
export class CommitLoadMoreComponent {
  dataSource = new MatTableDataSource<GithubIssue>([]);
  columns = this.setColumns();
  displayedColumns: string[] = this.setDisplayedColumns();
  pageIndex = 0;
  pageSize = 30;
  sortType = 'created';
  sortOrder: SortDirection = 'desc';
  isLoadingResults$ = of(false);
  isRateLimitReached$ = of(false);

  private commitService = inject(CommitService);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.setInitialState();
  }

  setInitialState() {
    this.loadMoreData();
  }
  loadMoreData(): void {
    this.loadData();
  }

  private loadData(): void {
    this.isLoadingResults$ = of(true);
    this.commitService
      .getRepoIssues(this.sortType, this.sortOrder, this.pageIndex)
      .pipe(
        tap((data) => {
          this.pageIndex++;
          this.isLoadingResults$ = of(false);
          this.isRateLimitReached$ = of(data === null);
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
