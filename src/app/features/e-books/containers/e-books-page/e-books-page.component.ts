import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, of, takeUntil, tap } from 'rxjs';
import { NavigationTab } from '../../models/e-book-navigation-tab';
import { EBookNavigationService } from '../../services/e-book-navigation.service';

@Component({
  selector: 'app-e-books-page',
  templateUrl: './e-books-page.component.html',
  styleUrls: ['./e-books-page.component.scss'],
})
export class EBooksPageComponent {}