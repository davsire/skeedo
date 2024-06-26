import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private static readonly BASE_URL = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {}

  public get<T>(path: string): Observable<T> {
    const options = this.getRequestOptions();
    return this.httpClient.get<T>(`${ApiService.BASE_URL}${path}`, options);
  }

  public post<T>(path: string, data: any): Observable<T> {
    const options = this.getRequestOptions();
    return this.httpClient.post<T>(`${ApiService.BASE_URL}${path}`, JSON.stringify(data), options);
  }

  public put<T>(path: string, data: any): Observable<T> {
    const options = this.getRequestOptions();
    return this.httpClient.put<T>(`${ApiService.BASE_URL}${path}`, JSON.stringify(data), options);
  }

  public delete<T>(path: string): Observable<T> {
    const options = this.getRequestOptions();
    return this.httpClient.delete<T>(`${ApiService.BASE_URL}${path}`, options);
  }

  private getRequestOptions(): {headers: HttpHeaders} {
    return {headers: this.getRequestHeaders()};
  }

  private getRequestHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    return headers;
  }
}
