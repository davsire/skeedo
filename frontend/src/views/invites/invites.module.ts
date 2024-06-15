import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InvitesComponent } from './invites.component';

@NgModule({
  declarations: [
    InvitesComponent
  ],
  imports: [
    CommonModule,
    CardModule,
  ]
})
export class InvitesModule { }
