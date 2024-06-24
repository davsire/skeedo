import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { ROUTES } from 'src/shared/routes';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  if (state.url.includes(ROUTES.login.path) || state.url.includes(ROUTES.register.path)) {
    return !inject(AuthenticationService).isAuthenticated() || inject(Router).navigate([ROUTES.home.path]);
  }
  return inject(AuthenticationService).isAuthenticated() || inject(Router).navigate([ROUTES.login.path]);
};
