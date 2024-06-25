import { Component, OnInit } from '@angular/core';
import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { Subject } from 'rxjs';
import { ActionModel } from 'src/models/action-model';
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
  readonly participantsNameField = 'participantsNameField';
  readonly actionsField = 'actions';

  openRespondInvite = new Subject<any>();
  invitesSent: any[] = [
    {
      id: 1,
      name: 'Fazer trabalho de WEB',
      beginDate: new Date('2024-06-01'),
      endDate: new Date('2024-06-31'),
      participants: ['Davi', 'Leonardo', 'Gabriel'],
    },
    {
      id: 2,
      name: 'ir no mercado',
      beginDate: new Date('2024-07-15'),
      endDate: new Date('2024-07-18'),
      participants: ['Alguém'],
    },
    {
      id: 3,
      name: 'alguma coisa aí sla',
      beginDate: new Date('2024-06-01'),
      endDate: new Date('2024-07-31'),
      participants: ['Fulano', 'Ciclano'],
    },
  ]; // @TODO: replace this mock to a call to get invites endpoint

  invitesReceived: any[] = [
    {
      id: 1,
      name: 'Sair pra jogar sinuca',
      beginDate: new Date('2024-06-01'),
      endDate: new Date('2024-06-31'),
      creator: 'Pessoa A'
    },
    {
      id: 2,
      name: 'sla ir na bu talvez',
      beginDate: new Date('2024-07-15'),
      endDate: new Date('2024-07-18'),
      creator: 'Pessoa B'
    },
    {
      id: 3,
      name: 'Um date fofo',
      beginDate: new Date('2024-06-01'),
      endDate: new Date('2024-07-31'),
      creator: 'Pessoa C'
    },
  ]; // @TODO: replace this mock to a call to get invites endpoint

  constructor(
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService,
  ) {}

  public ngOnInit(): void {
    this.invitesSent.forEach(invite => this.mapInviteFields(invite, true));
    this.invitesReceived.forEach(invite => this.mapInviteFields(invite, false));
  }

  private mapInviteFields(invite: any, isSent: boolean) {
    invite[this.actionsField] = this.getActions(invite, isSent);
    if (isSent) {
      invite[this.participantsNameField] = this.getParticipants(invite.participants);
    }
  }

  private getParticipants(participants: string[]): string {
    const firstParticipants = participants.slice(0, this.numberParticipantsShow);
    const lastParticipantsCount = participants.slice(this.numberParticipantsShow).length;
    return firstParticipants.join(', ') + (lastParticipantsCount ? ` e mais ${lastParticipantsCount}` : '');
  }

  private getActions(invite: any, isSent: boolean): ActionModel[] {
    if (isSent) {
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
          action: this.deleteInvite.bind(this, invite.id),
          icon: PrimeIcons.TRASH,
        },
      ];
    }

    return [
      {
        title: 'Responder convite',
        action: () => this.openRespondInvite.next(invite),
        icon: PrimeIcons.SEND,
      }
    ];
  }

  private updateInvite(invite: any): void {
    this.notificationService.success('Convite alterado com sucesso!');
  }

  private deleteInvite(inviteId: any): void {
    this.confirmationService.confirm({
      header: 'Cancelar convite',
      message: 'Tem certeza que deseja cancelar esse convite?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.notificationService.success('Convite cancelado com sucesso!'),
    });
  }
}
