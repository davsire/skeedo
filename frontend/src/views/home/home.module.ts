import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { EventModalModule } from 'src/components/event-modal/event-modal.module';
import { HomeComponent } from './home.component';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    TooltipModule,
    TableModule,
    PaginatorModule,
    EventModalModule,
  ]
})
export class HomeModule { }
