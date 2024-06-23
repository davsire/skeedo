import { Component, OnInit } from '@angular/core';

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
  ]; // @TODO: replace this mock to a call to get events endpoint

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
  ]; // @TODO: replace this mock to a call to get events endpoint

  public ngOnInit(): void {
    this.invitesSent.forEach(invite => this.mapEventFields(invite, true));
    this.invitesReceived.forEach(invite => this.mapEventFields(invite, false));
  }

  private mapEventFields(event: any, isSent: boolean) {
    if (isSent) {
      event[this.participantsNameField] = this.getParticipants(event.participants);
      return;
    }
  }

  private getParticipants(participants: string[]): string {
    const firstParticipants = participants.slice(0, this.numberParticipantsShow);
    const lastParticipantsCount = participants.slice(this.numberParticipantsShow).length;
    return firstParticipants.join(', ') + (lastParticipantsCount ? ` e mais ${lastParticipantsCount}` : '');
  }
}
