import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserLogin } from 'src/models/user-login.model';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(private apiService: ApiService) { }

  private _isAuthenticated: boolean = false;

  public isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  public logIn(userLogin: UserLogin): Observable<void> {
    this._isAuthenticated = true;
    return of(null);
  }

  public logOut(): Observable<void> {
    this._isAuthenticated = false;
    return of(null);
  }
}
