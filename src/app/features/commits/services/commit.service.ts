import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  catchError,
  finalize,
  of,
  shareReplay,
  tap,
} from 'rxjs';
import {
  DummyDataForInfiniteScroll,
  GithubApi,
  GithubIssue,
} from '../models/commit';

@Injectable({
  providedIn: 'root',
})
export class CommitService {
  private repoIssuesSub = new BehaviorSubject<GithubIssue[]>([]);
  repoIssues$ = this.repoIssuesSub.asObservable();
  get _repoIssues(): GithubIssue[] {
    return this.repoIssuesSub.getValue();
  }

  private repoIssuesLoadingSub = new BehaviorSubject<boolean>(false);
  repoIssuesLoading$ = this.repoIssuesLoadingSub.asObservable();
  get _repoIssuesLoading(): boolean {
    return this.repoIssuesLoadingSub.getValue();
  }

  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService
  ) {}

  getRepoIssues(
    sort: string,
    order: SortDirection,
    page: number,
    per_page = 30
  ): Observable<GithubApi> {
    this.repoIssuesLoadingSub.next(true);

    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${
      page + 1
    }&per_page=${per_page}`;

    return this.httpClient.get<GithubApi>(requestUrl).pipe(
      tap((data) => {
        this.repoIssuesSub.next(data.items);
      }),
      catchError((err) => {
        this.toastrService.error(err?.error?.message || 'Format Err Message!');
        return EMPTY;
      }),
      finalize(() => {
        this.repoIssuesLoadingSub.next(false);
      }),
      shareReplay(1)
    );
  }

  getDummyDataForInfiniteScroll() {
    const dummyDataForInfiniteScrollObs$: Observable<
      DummyDataForInfiniteScroll[]
    > = of(
      [...Array(10_000).keys()].map((index) => ({
        id: index,
        firstName: `firstName_${index}`,
        lastName: `lastName_${index}`,
        age: 18 + (index % 12),
      }))
    );

    return dummyDataForInfiniteScrollObs$;
  }
}
