import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Event } from 'src/models/event.model';
import { EventBestDates } from 'src/models/event-best-dates.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  readonly eventId = '{eventId}';
  readonly pathBase = 'events';
  readonly pathClosedEvents = this.pathBase + '/closed';
  readonly pathWaitingResponseEvents = this.pathBase + '/waiting-responses';
  readonly pathEventSettle = this.pathBase + `/${this.eventId}/settle`;

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

  public getEventBestDates(eventId: string): Observable<EventBestDates> {
    return this.apiService.get<EventBestDates>(this.pathEventSettle.replace(this.eventId, eventId));
  }

  public scheduleEvent(eventId: string, eventData: Event): Observable<void> {
    return this.apiService.patch(this.pathEventSettle.replace(this.eventId, eventId), eventData);
  }
}
