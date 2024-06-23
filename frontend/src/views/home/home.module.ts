import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { EventModalModule } from 'src/components/event-modal/event-modal.module';
import { DataTableModule } from 'src/components/data-table/data-table.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    TooltipModule,
    DataTableModule,
    EventModalModule,
  ]
})
export class HomeModule { }
