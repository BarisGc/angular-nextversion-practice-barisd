import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  showSidenavSub = new BehaviorSubject(false);
  showSidenav$ = this.showSidenavSub.asObservable();

  loadingSub = new BehaviorSubject(true);
  loading$ = this.loadingSub.asObservable();

  constructor() {}

  setSidenav(isOpen: boolean) {
    isOpen ? this.showSidenavSub.next(true) : this.showSidenavSub.next(false);
  }

  setLoading(isLoading: boolean) {
    isLoading ? this.loadingSub.next(true) : this.loadingSub.next(false);
  }
}
