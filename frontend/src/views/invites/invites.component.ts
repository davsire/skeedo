import { Component, OnInit } from '@angular/core';
import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { Subject } from 'rxjs';
import { ActionModel } from 'src/models/action.model';
import { Event } from 'src/models/event.model';
import { Invite } from 'src/models/invite.model';
import { User } from 'src/models/user.model';
import { NotificationService } from 'src/services/notification.service';
import { EventStatus } from 'src/shared/constants';

@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.css']
})
export class InvitesComponent implements OnInit {

  readonly numberParticipantsShow: number = 2;
  readonly columnsInvitesSent: string[] = ['Nome do evento', 'Período para marcar evento', 'Participantes'];
  readonly columnsInvitesReceived: string[] = ['Nome do evento', 'Período para marcar evento', 'Criador'];
  readonly participantsNameFullField = 'participantsNameFullField';
  readonly participantsNameField = 'participantsNameField';
  readonly actionsField = 'actions';

  openRespondInvite = new Subject<Invite>();
  openScheduleEvent = new Subject<Event>();
  invitesSent: Event[] = [
    {
      _id: '1',
      name: 'Fazer trabalho de WEB',
      creator: {
        displayName: 'Pessoa A'
      } as User,
      status: EventStatus.WAITING_RESPONSES,
      beginDate: new Date('2024-06-01'),
      endDate: new Date('2024-06-31'),
      eventDate: null,
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
      name: 'ir no mercado',
      creator: {
        displayName: 'Pessoa B'
      } as User,
      status: EventStatus.WAITING_RESPONSES,
      beginDate: new Date('2024-07-15'),
      endDate: new Date('2024-07-18'),
      eventDate: null,
      participants: [
        {
          displayName: 'Alguém'
        } as User,
      ],
    },
    {
      _id: '3',
      name: 'alguma coisa aí sla',
      creator: {
        displayName: 'Pessoa C'
      } as User,
      status: EventStatus.WAITING_RESPONSES,
      beginDate: new Date('2024-06-01'),
      endDate: new Date('2024-07-31'),
      eventDate: null,
      participants: [
        {
          displayName: 'Fulano'
        } as User,
        {
          displayName: 'Ciclano'
        } as User,
      ],
    },
  ]; // @TODO: replace this mock to a call to get invites endpoint

  invitesReceived: Invite[] = [
    {
      _id: '1',
      user: {
        displayName: 'Pessoa convidada A'
      } as User,
      event: {
        name: 'Sair pra jogar sinuca',
        beginDate: new Date('2024-06-01'),
        endDate: new Date('2024-06-31'),
        creator: {
          displayName: 'Pessoa A'
        } as User,
      } as Event,
      availableDays: [],
      responded: false,
    },
    {
      _id: '2',
      user: {
        displayName: 'Pessoa convidada B'
      } as User,
      event: {
        name: 'sla ir na bu talvez',
        beginDate: new Date('2024-07-15'),
        endDate: new Date('2024-07-18'),
        creator: {
          displayName: 'Pessoa B'
        } as User,
      } as Event,
      availableDays: [],
      responded: false,
    },
    {
      _id: '3',
      user: {
        displayName: 'Pessoa convidada C'
      } as User,
      event: {
        name: 'Um date fofo',
        beginDate: new Date('2024-06-01'),
        endDate: new Date('2024-06-31'),
        creator: {
          displayName: 'Pessoa C'
        } as User,
      } as Event,
      availableDays: [],
      responded: false,
    },
  ]; // @TODO: replace this mock to a call to get invites endpoint

  constructor(
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService,
  ) {}

  public ngOnInit(): void {
    this.invitesSent.forEach(invite => this.mapEventFields(invite));
    this.invitesReceived.forEach(invite => this.mapInviteFields(invite));
  }

  private mapEventFields(invite: Event) {
    invite[this.actionsField] = this.getEventActions(invite);
    invite[this.participantsNameFullField] = this.getParticipants(invite.participants, true);
    invite[this.participantsNameField] = this.getParticipants(invite.participants);
  }

  private mapInviteFields(invite: Invite) {
    invite[this.actionsField] = this.getInviteActions(invite);
  }

  private getParticipants(participants: User[], full = false): string {
    if (full) {
      return participants.map(participant => participant.displayName).join(', ');
    }
    const firstParticipants = participants.slice(0, this.numberParticipantsShow);
    const lastParticipantsCount = participants.slice(this.numberParticipantsShow).length;
    return firstParticipants.map(participant => participant.displayName).join(', ') + (lastParticipantsCount ? ` e mais ${lastParticipantsCount}` : '');
  }

  private getEventActions(event: Event): ActionModel[] {
    return [
      {
        title: 'Marcar evento',
        action: () => this.openScheduleEvent.next(event),
        icon: PrimeIcons.CALENDAR,
      },
      {
        title: 'Editar convite',
        action: this.updateInvite.bind(this, event),
        icon: PrimeIcons.PENCIL,
      },
      {
        title: 'Cancelar convite',
        action: this.deleteInvite.bind(this, event._id),
        icon: PrimeIcons.TRASH,
      },
    ];
  }

  private getInviteActions(invite: Invite): ActionModel[] {
    return [
      {
        title: 'Responder convite',
        action: () => this.openRespondInvite.next(invite),
        icon: PrimeIcons.SEND,
      }
    ];
  }

  private updateInvite(invite: Event): void {
    this.notificationService.success('Convite alterado com sucesso!');
  }

  private deleteInvite(inviteId: string): void {
    this.confirmationService.confirm({
      header: 'Cancelar convite',
      message: 'Tem certeza que deseja cancelar esse convite?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.notificationService.success('Convite cancelado com sucesso!'),
    });
  }
}
