import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map } from 'rxjs';
import { UserLogin } from 'src/models/user-login.model';
import { User } from 'src/models/user.model';
import { AuthRes } from 'src/models/auth-res.model';
import { SessionService } from './session.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  readonly pathSignIn = 'signin';
  readonly pathSignUp = 'signup';

  constructor(private apiService: ApiService, private sessionService: SessionService) { }

  public isAuthenticated(): boolean {
    return !!this.sessionService.getToken();
  }

  public signIn(userLogin: UserLogin): Observable<void> {
    return this.apiService.post<AuthRes>(this.pathSignIn, userLogin)
      .pipe(map((res: AuthRes) => this.sessionService.setToken(res.access_token)));
  }

  public signUp(user: User): Observable<void> {
    return this.apiService.post<AuthRes>(this.pathSignUp, user)
      .pipe(map((res: AuthRes) => this.sessionService.setToken(res.access_token)));
  }

  public signOut(): void {
    this.sessionService.setToken(null);
  }
}
