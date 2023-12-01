import { Observable } from 'rxjs';
import { EBookSearchService } from './../../services/e-book-search.service';
import { Component } from '@angular/core';
import { EBook } from '../../models/e-book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EBookDataService } from '../../services/e-book-data.service';

@Component({
  selector: 'app-find-e-book-page',
  templateUrl: './find-e-book-page.component.html',
  styleUrls: ['./find-e-book-page.component.scss'],
})
export class FindEBookPageComponent {
  searchQuery$!: Observable<string>;
  foundedEBooks$!: Observable<EBook[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string>;

  allStoredEBooks!: any;

  previewEBookRelativeUrl = '../view';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eBookSearchService: EBookSearchService
  ) {}

  ngOnInit() {
    this.getInitialState();
  }

  getInitialState(): void {
    this.foundedEBooks$ = this.eBookSearchService.foundedBooks$;
    this.searchQuery$ = this.eBookSearchService.query$;
    this.loading$ = this.eBookSearchService.loading$;
    this.error$ = this.eBookSearchService.error$;
  }

  bySearch(query: string) {
    this.eBookSearchService.searchEBooks(query).subscribe();
  }

  // routePractice() {
  //   const fragment = location.hash.substring(1);
  //   const [hash1, hash2] = fragment.split('=');
  //   console.log('hash1', hash1);
  //   console.log('hash2', hash2);
  //   console.log('fragment', this.route.snapshot.fragment);
  //   console.log('params', this.route.snapshot.params);
  //   console.log('queryParams', this.route.snapshot.queryParams);
  //   console.log('paramMap', this.route.snapshot.paramMap);
  // }
}
