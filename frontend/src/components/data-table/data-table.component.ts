import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  @Input() items: any[] = [];
  @Input() tableHeader: TemplateRef<any>;
  @Input() tableContent: TemplateRef<any>;

  readonly paginatorFirst: number = 0;
  readonly paginatorRows: number = 2;

  paginatedItems: any[] = [];

  public ngOnInit(): void {
    this.onPageChange({first: this.paginatorFirst, rows: this.paginatorRows});
  }

  public onPageChange(event: PaginatorState): void {
    this.paginatedItems = this.items.slice(event.first, event.first + event.rows);
  }
}
