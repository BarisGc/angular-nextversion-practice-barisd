import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

export const authGuard = (): Observable<boolean> => {
  const authService = inject(AuthService);

  return authService.user$.pipe(
    map((authed) => {
      if (!authed) {
        authService.loginRedirect();
        return false;
      }

      return true;
    }),
    take(1)
  );
};
