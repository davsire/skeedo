import { Component, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  readonly paginatorFirst: number = 0;
  readonly paginatorRows: number = 2;
  readonly numberParticipantsShow: number = 2;
  readonly columns: string[] = ['Nome do evento', 'Data do evento', 'Participantes'];

  events: any[] = [
    {
      name: 'Fazer trabalho',
      date: new Date('2024-06-01'),
      participants: ['Davi', 'Leonardo', 'Gabriel'],
    },
    {
      name: 'Sair para caminhar',
      date: new Date('2024-06-12'),
      participants: ['Alguém'],
    },
    {
      name: 'Piquenique',
      date: new Date('2024-06-20'),
      participants: ['Fulano', 'Ciclano'],
    },
    {
      name: 'Outro evento bacana',
      date: new Date('2024-06-31'),
      participants: ['ABC', 'DEF', 'GHI', 'JKL', 'MNO'],
    },
  ]; // @TODO: replace this mock to a call to get events endpoint
  paginatedEvents: any [] = [];

  public ngOnInit(): void {
    this.onPageChange({first: this.paginatorFirst, rows: this.paginatorRows});
  }

  public getParticipants(participants: string[]): string {
    const firstParticipants = participants.slice(0, this.numberParticipantsShow);
    const lastParticipantsCount = participants.slice(this.numberParticipantsShow).length;
    return firstParticipants.join(', ') + (lastParticipantsCount ? ` e mais ${lastParticipantsCount}` : '');
  }

  public onPageChange(event: PaginatorState): void {
    this.paginatedEvents = this.events.slice(event.first, event.first + event.rows);
  }
}
