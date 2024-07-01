import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Event } from 'src/models/event.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  readonly pathBase = 'events';
  readonly pathClosedEvents = this.pathBase + '/closed';
  readonly pathWaitingResponseEvents = this.pathBase + '/waiting-responses';

  constructor(private apiService: ApiService) {}

  public getClosedEvents(): Observable<Event[]> {
    return this.apiService.get<Event[]>(this.pathClosedEvents);
  }

  public getWaitingResponsesEvents(): Observable<Event[]> {
    return this.apiService.get<Event[]>(this.pathWaitingResponseEvents);
  }

  public createEvent(eventData: Event): Observable<Event> {
    return this.apiService.post<Event>(this.pathBase, eventData);
  }

  public updateEvent(eventId: string, eventData: Event): Observable<void> {
    return this.apiService.patch<void>(this.pathBase + '/' + eventId, eventData);
  }

  public deleteEvent(eventId: string): Observable<void> {
    return this.apiService.delete<void>(this.pathBase + '/' + eventId);
  }
}
