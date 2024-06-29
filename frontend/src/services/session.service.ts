import { Injectable } from '@angular/core';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private static readonly TOKEN_KEY = 'token';

  @LocalStorage(SessionService.TOKEN_KEY)
  private token: string;

  constructor(private storageService: LocalStorageService) {}

  public getToken(): string {
    return this.token;
  }

  public setToken(token: string): void {
    this.storageService.store(SessionService.TOKEN_KEY, token);
  }
}
