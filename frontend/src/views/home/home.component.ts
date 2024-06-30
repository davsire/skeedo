import { Component, OnInit } from '@angular/core';
import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { ActionModel } from 'src/models/action.model';
import { Event } from 'src/models/event.model';
import { User } from 'src/models/user.model';
import { EventService } from 'src/services/event.service';
import { NotificationService } from 'src/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  readonly numberParticipantsShow: number = 2;
  readonly columns: string[] = ['Nome do evento', 'Data do evento', 'Participantes'];
  readonly participantsNameFullField = 'participantsNameFullField';
  readonly participantsNameField = 'participantsNameField';
  readonly actionsField = 'actions';

  events: Event[];

  constructor(
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService,
    private eventService: EventService,
  ) {}

  public ngOnInit(): void {
    this.getEvents();
  }

  private getEvents(): void {
    this.events = null;
    this.eventService.getClosedEvents().subscribe((events: Event[]) => {
      this.events = events;
      this.events.forEach(this.mapEventFields.bind(this));
    });
  }

  private mapEventFields(invite: Event) {
    invite[this.actionsField] = this.getActions(invite);
    invite[this.participantsNameFullField] = this.getParticipants(invite.participants, true);
    invite[this.participantsNameField] = this.getParticipants(invite.participants);
  }

  private getParticipants(participants: User[], full = false): string {
    if (full) {
      return participants.map(participant => participant.displayName).join(', ');
    }
    const firstParticipants = participants.slice(0, this.numberParticipantsShow);
    const lastParticipantsCount = participants.slice(this.numberParticipantsShow).length;
    return firstParticipants.map(participant => participant.displayName).join(', ') + (lastParticipantsCount ? ` e mais ${lastParticipantsCount}` : '');
  }

  private getActions(event: Event): ActionModel[] {
    return [
      {
        title: 'Editar evento',
        action: this.updateEvent.bind(this, event),
        icon: PrimeIcons.PENCIL,
      },
      {
        title: 'Cancelar evento',
        action: this.confirmDeleteEvent.bind(this, event._id),
        icon: PrimeIcons.TRASH,
      },
    ];
  }

  private updateEvent(event: Event): void {
    this.notificationService.success('Evento alterado com sucesso!');
  }

  private confirmDeleteEvent(eventId: string): void {
    this.confirmationService.confirm({
      header: 'Cancelar evento',
      message: 'Tem certeza que deseja cancelar esse evento?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.deleteEvent(eventId),
    });
  }

  private deleteEvent(eventId: string) {
    this.eventService.deleteEvent(eventId).subscribe(() => {
      this.notificationService.success('Evento cancelado com sucesso!');
      this.getEvents();
    });
  }
}
