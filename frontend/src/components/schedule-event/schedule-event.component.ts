import { Component, DestroyRef, Input, ViewEncapsulation, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Event } from 'src/models/event.model';
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

  readonly fieldEventDate = CONSTANTS.FIELD_EVENT_DATE;

  destroyRef = inject(DestroyRef);
  modalVisible = false;
  event: Event;
  scheduleEventData: FormGroup;
  bestDays = [
    {
      day: new Date('2024-06-02'),
      participants: ['Davi', 'Leo', 'Gab'],
      best: true,
    },
    {
      day: new Date('2024-06-14'),
      participants: ['Fulano', 'Ciclano'],
      best: false,
    },
    {
      day: new Date('2024-06-30'),
      participants: ['ABC', 'DEF', 'GHI'],
      best: true,
    },
  ];
  bestDaysMap: Map<string, string[]> = new Map();

  constructor(
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
  ) {}

  public isBestDay(day): boolean {
    return this.bestDaysMap.has(`${day.year}-${day.month}-${day.day}`);
  }

  public ngOnInit(): void {
    this.initScheduleEventData();
    this.mapBestDays();
    this.openScheduleEvent.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      this.event = event;
      this.modalVisible = true;
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
    this.notificationService.success('Evento marcado com sucesso! Aproveite e se divirta! :)');
    this.closeModal();
  }

  public getParticipants(day): string {
    return this.bestDaysMap.get(`${day.year}-${day.month}-${day.day}`)?.join(', ');
  }

  private initScheduleEventData(): void {
    this.scheduleEventData = this.formBuilder.group({
      [this.fieldEventDate]: [null, Validators.required],
    });
  }

  private mapBestDays(): void {
    this.bestDays.forEach((day) => {
      const formattedDate = `${day.day.getFullYear()}-${day.day.getMonth()}-${day.day.getDate()}`;
      this.bestDaysMap.set(formattedDate, day.participants);
    });
  }
}
