import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { DataTableModule } from 'src/components/data-table/data-table.module';
import { ActionMenuModule } from 'src/components/action-menu/action-menu.module';
import { EventModalModule } from 'src/components/event-modal/event-modal.module';
import { HomeComponent } from './home.component';
import { UpdateEventModule } from 'src/components/update-event/update-event.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    TooltipModule,
    DataTableModule,
    ActionMenuModule,
    EventModalModule,
    UpdateEventModule
  ]
})
export class HomeModule { }
