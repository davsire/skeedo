import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { DataTableModule } from 'src/components/data-table/data-table.module';
import { EventModalModule } from 'src/components/event-modal/event-modal.module';
import { ActionMenuModule } from 'src/components/action-menu/action-menu.module';
import { InvitesComponent } from './invites.component';

@NgModule({
  declarations: [
    InvitesComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    TabViewModule,
    TooltipModule,
    DataTableModule,
    EventModalModule,
    ActionMenuModule,
  ]
})
export class InvitesModule { }
