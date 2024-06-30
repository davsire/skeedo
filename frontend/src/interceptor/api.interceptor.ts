import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError, throwError } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';
import { NotificationService } from 'src/services/notification.service';
import { ROUTES } from 'src/shared/routes';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  
  private static readonly UNAUTHORIZED = 401;
  private static readonly BAD_REQUEST = 400;
  private static readonly ERROR_MSG_MAP = new Map<string, string>([
    ['User already exists', 'O nome de usuário já está em uso!'],
  ]);

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
  ) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => this.handleError(req, next, error)));
  }

  private handleError(req: HttpRequest<any>, next: HttpHandler, error: any): Observable<never> {
    if (!(error instanceof HttpErrorResponse)) {
      return throwError(error);
    }
    switch (error.status) {
      case ApiInterceptor.UNAUTHORIZED:
        return this.handleUnauthorized(req);
      case ApiInterceptor.BAD_REQUEST:
        return this.handleBadRequest(error);
      default:
        return EMPTY;
    }
  }

  private handleUnauthorized(req: HttpRequest<any>): Observable<never> {
    if (req.url.includes('signin')) {
      this.notificationService.error('Usuário ou senha incorretos!');
      return EMPTY;
    }
    this.authenticationService.signOut();
    this.router.navigate([ROUTES.login.path]);
    return EMPTY;
  }

  private handleBadRequest(error: HttpErrorResponse): Observable<never> {
    if (ApiInterceptor.ERROR_MSG_MAP.has(error.error.message)) {
      this.notificationService.error(ApiInterceptor.ERROR_MSG_MAP.get(error.error.message));
    }
    return EMPTY;
  }
}