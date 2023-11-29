import { Injectable } from '@angular/core';
import { Observable, fromEvent, map, merge, switchMap, timer } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  clicks$ = fromEvent(document, 'click');
  keys$ = fromEvent(document, 'keydown');
  mouse$ = fromEvent(document, 'mousemove');

  constructor(private authService: AuthService) {
    this.handleUserEvents();
  }

  handleUserEvents() {
    const eventGroup1 = merge(this.clicks$, this.keys$, this.mouse$);

    this.autoLogoutIdleUser(eventGroup1);
  }

  autoLogoutIdleUser(eventGroup1: Observable<Event>) {
    eventGroup1.pipe(
      // 5 minute inactivity timeout
      switchMap(() => timer(5 * 60 * 1000)),
      map(() => this.authService.logout())
    );
  }
}
