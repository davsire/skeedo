import { Component, OnInit } from '@angular/core';
import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { ActionModel } from 'src/models/action.model';
import { Event } from 'src/models/event.model';
import { User } from 'src/models/user.model';
import { NotificationService } from 'src/services/notification.service';
import { EventStatus } from 'src/shared/constants';

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

  events: Event[] = [
    {
      _id: '1',
      name: 'Fazer trabalho',
      creator: {
        displayName: 'Pessoa A'
      } as User,
      status: EventStatus.EVENT_CLOSED,
      beginDate: new Date('2024-06-01'),
      endDate: new Date('2024-06-31'),
      eventDate:  new Date('2024-06-01'),
      participants: [
        {
          displayName: 'Davi'
        } as User,
        {
          displayName: 'Leonardo'
        } as User,
        {
          displayName: 'Gabriel'
        } as User,
      ],
    },
    {
      _id: '2',
      name: 'Sair para caminhar',
      creator: {
        displayName: 'Pessoa B'
      } as User,
      status: EventStatus.EVENT_CLOSED,
      beginDate: new Date('2024-07-15'),
      endDate: new Date('2024-07-18'),
      eventDate: new Date('2024-07-17'),
      participants: [
        {
          displayName: 'Alguém'
        } as User,
      ],
    },
    {
      _id: '3',
      name: 'Piquenique',
      creator: {
        displayName: 'Pessoa C'
      } as User,
      status: EventStatus.EVENT_CLOSED,
      beginDate: new Date('2024-06-01'),
      endDate: new Date('2024-07-31'),
      eventDate: new Date('2024-06-20'),
      participants: [
        {
          displayName: 'Fulano'
        } as User,
        {
          displayName: 'Ciclano'
        } as User,
      ],
    },
    {
      _id: '4',
      name: 'Outro evento bacana',
      creator: {
        displayName: 'Pessoa D'
      } as User,
      status: EventStatus.EVENT_CLOSED,
      beginDate: new Date('2024-06-01'),
      endDate: new Date('2024-07-31'),
      eventDate: new Date('2024-06-31'),
      participants: [
        {
          displayName: 'ABC'
        } as User,
        {
          displayName: 'DEF'
        } as User,
        {
          displayName: 'GHI'
        } as User,
        {
          displayName: 'JKL'
        } as User,
      ],
    },
  ]; // @TODO: replace this mock to a call to get events endpoint

  constructor(
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService,
  ) {}

  public ngOnInit(): void {
    this.events.forEach(this.mapEventFields.bind(this));
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
        action: this.deleteEvent.bind(this, event._id),
        icon: PrimeIcons.TRASH,
      },
    ];
  }

  private updateEvent(event: Event): void {
    this.notificationService.success('Evento alterado com sucesso!');
  }

  private deleteEvent(eventId: string): void {
    this.confirmationService.confirm({
      header: 'Cancelar evento',
      message: 'Tem certeza que deseja cancelar esse evento?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.notificationService.success('Evento cancelado com sucesso!'),
    });
  }
}
