import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { EventBestDates } from 'src/models/event-best-dates.model';
import { Event } from 'src/models/event.model';
import { User } from 'src/models/user.model';
import { EventService } from 'src/services/event.service';
import { NotificationService } from 'src/services/notification.service';
import { CONSTANTS } from 'src/shared/constants';

@Component({
  selector: 'app-schedule-event',
  templateUrl: './schedule-event.component.html',
  styleUrls: ['./schedule-event.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ScheduleEventComponent {

  @Input() openScheduleEvent: Subject<Event>;
  @Output() scheduledEvent = new EventEmitter<void>();

  readonly fieldEventDate = CONSTANTS.FIELD_EVENT_DATE;

  destroyRef = inject(DestroyRef);
  modalVisible = false;
  event: Event;
  scheduleEventData: FormGroup;
  bestDates: EventBestDates;
  bestDatesMap: Map<string, User[]> = new Map();

  constructor(
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private eventService: EventService,
  ) {}

  public ngOnInit(): void {
    this.initScheduleEventData();
    this.openScheduleEvent.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      this.event = event;
      this.event.beginDate = new Date(this.event.beginDate);
      this.event.endDate = new Date(this.event.endDate);
      this.modalVisible = true;
      this.getEventBestDates();
    });
  }

  public closeModal(): void {
    this.modalVisible = false;
    this.clearScheduleEventData();
  }

  public clearScheduleEventData(): void {
    this.scheduleEventData.reset();
  }

  public scheduleEvent(): void {
    this.eventService.scheduleEvent(this.event._id, this.getScheduleEventData()).subscribe(() => {
      this.notificationService.success('Evento marcado com sucesso! Aproveite e se divirta! :)');
      this.scheduledEvent.next();
      this.closeModal();
    });
  }

  public isBestDate(date): boolean {
    return this.bestDatesMap.has(this.formatDate(date));
  }

  public getBestDateClass(date): string {
    if (!this.isBestDate(date)) return '';
    return this.bestDatesMap.get(this.formatDate(date)).length === this.bestDates.maxCountBestDate ? 'best-date' : 'recommended-date';
  }

  public getParticipants(date): string {
    if (!this.isBestDate(date)) return null;
    return this.bestDatesMap.get(this.formatDate(date))
      .map((participant) => participant.displayName)
      .join(', ');
  }

  private getEventBestDates(): void {
    this.eventService.getEventBestDates(this.event._id).subscribe((bestDates: EventBestDates) => {
      this.bestDates = bestDates;
      this.mapBestDates();
    });
  }

  private mapBestDates(): void {
    this.bestDates.dates.forEach((date) => {
      this.bestDatesMap.set(date.date, date.available);
    });
  }

  private formatDate(date): string {
    return new Date(date.year, date.month, date.day).toISOString().slice(0, 10);
  }

  private initScheduleEventData(): void {
    this.scheduleEventData = this.formBuilder.group({
      [this.fieldEventDate]: [null, Validators.required],
    });
  }

  private getScheduleEventData(): Event {
    return {
      eventDate: this.scheduleEventData.get(this.fieldEventDate).value,
    } as Event;
  }
}
