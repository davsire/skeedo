import { Component, OnInit } from '@angular/core';
import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { Subject } from 'rxjs';
import { ActionModel } from 'src/models/action.model';
import { Event } from 'src/models/event.model';
import { Invite } from 'src/models/invite.model';
import { User } from 'src/models/user.model';
import { EventService } from 'src/services/event.service';
import { InviteService } from 'src/services/invite.service';
import { NotificationService } from 'src/services/notification.service';

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
  openUpdateEventDialog = new Subject<Event>();
  invitesSent: Event[];
  invitesReceived: Invite[];

  constructor(
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService,
    private eventService: EventService,
    private inviteService: InviteService,
  ) {}

  public ngOnInit(): void {
    this.getInvitesSent();
    this.getInvitesReceived();
  }

  public getInvitesSent(): void {
    this.invitesSent = null;
    this.eventService.getWaitingResponsesEvents().subscribe((events: Event[]) => {
      this.invitesSent = events;
      this.invitesSent.forEach(invite => this.mapEventFields(invite));
    });
  }

  public getInvitesReceived(): void {
    this.invitesReceived = null;
    this.inviteService.getPendingInvites().subscribe((invites: Invite[]) => {
      this.invitesReceived = invites;
      this.invitesReceived.forEach(invite => this.mapInviteFields(invite));
    });
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
        action: () => {},
        icon: PrimeIcons.CALENDAR,
      },
      {
        title: 'Editar convite',
        action: () => this.openUpdateEventDialog.next(event),
        icon: PrimeIcons.PENCIL,
      },
      {
        title: 'Cancelar convite',
        action: this.confirmDeleteEvent.bind(this, event._id),
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
      },
      {
        title: 'Recusar convite',
        action: this.confirmDeclineInvite.bind(this, invite._id),
        icon: PrimeIcons.TIMES_CIRCLE,
      }
    ];
  }

  private confirmDeleteEvent(eventId: string): void {
    this.confirmationService.confirm({
      header: 'Cancelar convite',
      message: 'Tem certeza que deseja cancelar esse convite?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.deleteEvent(eventId),
    });
  }

  private confirmDeclineInvite(inviteId: string): void {
    this.confirmationService.confirm({
      header: 'Recusar convite',
      message: 'Tem certeza que deseja recusar esse convite?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.declineInvite(inviteId),
    });
  }

  private deleteEvent(eventId: string) {
    this.eventService.deleteEvent(eventId).subscribe(() => {
      this.notificationService.success('Convite cancelado com sucesso!');
      this.getInvitesSent();
    });
  }

  private declineInvite(inviteId: string) {
    this.inviteService.declineInvite(inviteId).subscribe(() => {
      this.notificationService.success('Convite recusado com sucesso!');
      this.getInvitesReceived();
    });
  }
}
