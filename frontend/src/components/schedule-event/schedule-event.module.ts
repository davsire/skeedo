import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { ScheduleEventComponent } from './schedule-event.component';

@NgModule({
  declarations: [
    ScheduleEventComponent
  ],
  exports: [
    ScheduleEventComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    TooltipModule,
    CalendarModule,
  ]
})
export class ScheduleEventModule { }
