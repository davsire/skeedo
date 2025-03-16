import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private static readonly BASE_URL = environment.SERVICE_HOST;
  private headers: HttpHeaders = new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  });

  constructor(private httpClient: HttpClient, private sessionService: SessionService) {}

  public get<T>(path: string): Observable<T> {
    const options = this.getRequestOptions(path);
    return this.httpClient.get<T>(`${ApiService.BASE_URL}${path}`, options);
  }

  public post<T>(path: string, data: any): Observable<T> {
    const options = this.getRequestOptions(path);
    return this.httpClient.post<T>(`${ApiService.BASE_URL}${path}`, JSON.stringify(data), options);
  }

  public put<T>(path: string, data: any): Observable<T> {
    const options = this.getRequestOptions(path);
    return this.httpClient.put<T>(`${ApiService.BASE_URL}${path}`, JSON.stringify(data), options);
  }

  public patch<T>(path: string, data: any): Observable<T> {
    const options = this.getRequestOptions(path);
    return this.httpClient.patch<T>(`${ApiService.BASE_URL}${path}`, JSON.stringify(data), options);
  }

  public delete<T>(path: string): Observable<T> {
    const options = this.getRequestOptions(path);
    return this.httpClient.delete<T>(`${ApiService.BASE_URL}${path}`, options);
  }

  private getRequestOptions(path: string): {headers: HttpHeaders} {
    return {headers: this.getRequestHeaders(path)};
  }

  private getRequestHeaders(path: string): HttpHeaders {
    let headers = this.headers;
    headers = this.setAuthHeader(headers, path);
    return headers;
  }

  private setAuthHeader(headers: HttpHeaders, path: string): HttpHeaders {
    if (path.includes('signin') || path.includes('signup')) {
      return headers;
    }
    return headers.set('Authorization', `Bearer ${this.sessionService.getToken()}`);
  }
}
