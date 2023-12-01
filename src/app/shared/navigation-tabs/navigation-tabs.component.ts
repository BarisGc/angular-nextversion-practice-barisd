import { Observable } from 'rxjs';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { NavigationTab } from '../../features/e-books/models/e-book-navigation-tab';
import { EBook } from '../../features/e-books/models/e-book.model';
import { EBookDataService } from '../../features/e-books/services/e-book-data.service';

@Component({
  selector: 'app-navigation-tabs',
  templateUrl: './navigation-tabs.component.html',
  styleUrls: ['./navigation-tabs.component.scss'],
})
export class NavigationTabsComponent implements OnInit, OnChanges {
  // #navigationTabs
  @Input() navigationTabs: NavigationTab[] = [];
  @Input() activeLink = 'stored';
  selectedEBook$!: Observable<EBook | null>;
  previousUrl: string = '';
  currentUrl: string = '';
  ebookViewDetailLink = '';

  // #cycleorder #cycle #order
  constructor(
    private router: Router,
    private eBookDataService: EBookDataService
  ) {
    console.log('constructor');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getInitialState();
  }

  getInitialState() {
    this.selectedEBook$ = this.eBookDataService.selectedEBook$;
  }

  ngOnDestroy() {
    // TODO: manage selectedEBook unsubscription
  }
}
