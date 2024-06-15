import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { ROUTES } from 'src/shared/routes';

export const AuthGuard: CanActivateFn = () => {
  return inject(AuthenticationService).isAuthenticated() || inject(Router).navigate([ROUTES.login.path]);
};
