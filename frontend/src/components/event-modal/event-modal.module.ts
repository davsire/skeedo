import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { EventModalComponent } from './event-modal.component';

@NgModule({
  declarations: [
    EventModalComponent,
  ],
  exports: [
    EventModalComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    MultiSelectModule,
  ]
})
export class EventModalModule { }
