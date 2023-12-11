import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { merge, startWith, switchMap, catchError, map, of, EMPTY } from 'rxjs';
import { GithubIssue } from '../../models/commit';
import { DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommitService } from '../../services/commit.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
const PIPES: [] = [];
const COMPONENTS: [] = [];
const MODULES = [
  MatProgressSpinnerModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  DatePipe,
];
const DIRECTIVES: [] = [];
@Component({
  selector: 'app-commit-table-with-pagination',
  standalone: true,
  templateUrl: './commit-table-with-pagination.component.html',
  styleUrl: './commit-table-with-pagination.component.scss',
  imports: [...PIPES, ...COMPONENTS, ...MODULES, ...DIRECTIVES],
})
export class CommitTableWithPaginationComponent {
  displayedColumns: string[] = this.setDisplayedColumns();
  columns = this.setColumns();
  dataSource = new MatTableDataSource<GithubIssue>([]);
  resultsLength = 0;
  pageSize = 30;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  httpClient = inject(HttpClient);
  commitService = inject(CommitService);
  toastrService = inject(ToastrService);

  private destroyRef = inject(DestroyRef);
  ngOnInit() {}

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(
      () => (this.paginator.pageIndex = 0)
    );

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.commitService
            .getRepoIssues(
              this.sort.active,
              this.sort.direction,
              this.paginator.pageIndex
            )
            .pipe(
              catchError((err: any) => {
                this.toastrService.error(err?.error?.message || "Format Err Message!");
                return EMPTY;
              })
            );
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests

          this.resultsLength = data.total_count;
          return data.items;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((data) => {
        this.dataSource.data = data;
      });
  }

  setDisplayedColumns() {
    return this.setColumns().map((c) => c.columnDef);
  }

  setColumns() {
    const columns = [
      {
        columnDef: 'created',
        header: 'Created',
        cell: (element: GithubIssue) => `${element.created_at}`,
      },
      {
        columnDef: 'state',
        header: 'State',
        cell: (element: GithubIssue) => `${element.state}`,
      },
      {
        columnDef: 'number',
        header: '#',
        cell: (element: GithubIssue) => `${element.number}`,
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
