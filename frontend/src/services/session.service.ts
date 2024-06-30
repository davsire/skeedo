import { Injectable } from '@angular/core';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private static readonly TOKEN_KEY = 'token';
  private static readonly USER_ID_KEY = 'user-id';

  @LocalStorage(SessionService.TOKEN_KEY)
  private token: string;

  @LocalStorage(SessionService.USER_ID_KEY)
  private userId: string;

  constructor(private storageService: LocalStorageService) {}

  public getToken(): string {
    return this.token;
  }

  public setToken(token: string): void {
    this.storageService.store(SessionService.TOKEN_KEY, token);
  }

  public getUserId(): string {
    return this.userId;
  }

  public setUserId(userId: string): void {
    this.storageService.store(SessionService.USER_ID_KEY, userId);
  }
}
