import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DataTableComponent } from './data-table.component';

@NgModule({
  declarations: [
    DataTableComponent,
  ],
  exports: [
    DataTableComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    PaginatorModule,
  ]
})
export class DataTableModule { }
