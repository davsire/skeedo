import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { ActionModel } from 'src/models/action-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  readonly numberParticipantsShow: number = 2;
  readonly columns: string[] = ['Nome do evento', 'Data do evento', 'Participantes'];
  readonly participantsNameField = 'participantsNameField';
  readonly actionsField = 'actions';

  events: any[] = [
    {
      id: 1,
      name: 'Fazer trabalho',
      date: new Date('2024-06-01'),
      participants: ['Davi', 'Leonardo', 'Gabriel'],
    },
    {
      id: 2,
      name: 'Sair para caminhar',
      date: new Date('2024-06-12'),
      participants: ['Alguém'],
    },
    {
      id: 3,
      name: 'Piquenique',
      date: new Date('2024-06-20'),
      participants: ['Fulano', 'Ciclano'],
    },
    {
      id: 4,
      name: 'Outro evento bacana',
      date: new Date('2024-06-31'),
      participants: ['ABC', 'DEF', 'GHI', 'JKL', 'MNO'],
    },
  ]; // @TODO: replace this mock to a call to get events endpoint

  public ngOnInit(): void {
    this.events.forEach(this.mapEventFields.bind(this));
  }

  private mapEventFields(event: any) {
    event[this.participantsNameField] = this.getParticipants(event.participants);
    event[this.actionsField] = this.getActions(event.id);
  }

  private getParticipants(participants: string[]): string {
    const firstParticipants = participants.slice(0, this.numberParticipantsShow);
    const lastParticipantsCount = participants.slice(this.numberParticipantsShow).length;
    return firstParticipants.join(', ') + (lastParticipantsCount ? ` e mais ${lastParticipantsCount}` : '');
  }

  private getActions(eventId: any): ActionModel[] {
    return [
      {
        title: 'Editar',
        action: () => console.log('editando ' + eventId),
        icon: PrimeIcons.PENCIL,
      },
      {
        title: 'Excluir',
        action: () => console.log('excluindo ' + eventId),
        icon: PrimeIcons.TRASH,
      },
    ];
  }
}
