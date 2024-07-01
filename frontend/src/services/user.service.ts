import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly pathBase = 'users';

  constructor(private apiService: ApiService) {}

  public getAllUsers(): Observable<User[]> {
    return this.apiService.get<User[]>(this.pathBase);
  }

  public getUserById(userId: string): Observable<User> {
    return this.apiService.get<User>(this.pathBase + '/' + userId);
  }

  public updateUserById(userId: string, userData: User): Observable<User> {
    return this.apiService.patch<User>(this.pathBase + '/' + userId, userData);
  }

  public deleteUserById(userId: string): Observable<void> {
    return this.apiService.delete<void>(this.pathBase + '/' + userId);
  }
}
