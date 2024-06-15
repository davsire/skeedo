import { Component } from '@angular/core';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css']
})
export class EventModalComponent {

  modalVisible = false;
  users: string[] = ['Davi', 'Gabriel', 'Leonardo']; // this is a mock, update after the endponit to get users by nickname is complete

  public openModal(): void {
    this.modalVisible = true;
  }

  public closeModal(): void {
    this.modalVisible = false;
  }
}
