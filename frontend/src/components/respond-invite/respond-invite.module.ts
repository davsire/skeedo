import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { RespondInviteComponent } from './respond-invite.component';

@NgModule({
  declarations: [
    RespondInviteComponent
  ],
  exports: [
    RespondInviteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    CalendarModule,
  ]
})
export class RespondInviteModule { }
