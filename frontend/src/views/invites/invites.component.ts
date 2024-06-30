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

  private getInvitesReceived(): void {
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

  private getEventActions(invite: Event): ActionModel[] {
    return [
      {
        title: 'Marcar evento',
        action: () => {},
        icon: PrimeIcons.CALENDAR,
      },
      {
        title: 'Editar convite',
        action: this.updateInvite.bind(this, invite),
        icon: PrimeIcons.PENCIL,
      },
      {
        title: 'Cancelar convite',
        action: this.confirmDeleteEvent.bind(this, invite._id),
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

  private confirmDeleteEvent(eventId: string): void {
    this.confirmationService.confirm({
      header: 'Cancelar convite',
      message: 'Tem certeza que deseja cancelar esse convite?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.deleteEvent(eventId),
    });
  }

  private deleteEvent(eventId: string) {
    this.eventService.deleteEvent(eventId).subscribe(() => {
      this.notificationService.success('Convite cancelado com sucesso!');
      this.getInvitesSent();
    });
  }
}
