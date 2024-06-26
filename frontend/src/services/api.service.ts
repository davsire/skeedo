import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {}

  public get<T>(path: string): Observable<T> {
    const options = this.getRequestOptions();
    return this.httpClient.get<T>(path, options);
  }

  public post<T>(path: string, data: any): Observable<T> {
    const options = this.getRequestOptions();
    return this.httpClient.post<T>(path, JSON.stringify(data), options);
  }

  public put<T>(path: string, data: any): Observable<T> {
    const options = this.getRequestOptions();
    return this.httpClient.put<T>(path, JSON.stringify(data), options);
  }

  public delete<T>(path: string): Observable<T> {
    const options = this.getRequestOptions();
    return this.httpClient.delete<T>(path, options);
  }

  private getRequestOptions(): {headers: HttpHeaders} {
    return {headers: this.getRequestHeaders()};
  }

  private getRequestHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    return headers;
  }
}
