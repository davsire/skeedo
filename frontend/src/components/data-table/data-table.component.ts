import { Component, DestroyRef, Input, OnInit, TemplateRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
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
  @Input() emptyMessage = 'Você não possui registros nessa listagem...';

  readonly paginatorFirst: number = 0;
  readonly paginatorRows: number = 2;
  readonly paginatorRowsPerPageOptions: number[] = [2, 5, 10];

  paginatedItems: any[] = [];
  isMobile = false;
  destroyRef = inject(DestroyRef);

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  public ngOnInit(): void {
    this.initBreakpointObserver();
    this.onPageChange({first: this.paginatorFirst, rows: this.paginatorRows});
  }

  public onPageChange(event: PaginatorState): void {
    this.paginatedItems = this.items.slice(event.first, event.first + event.rows);
  }

  private initBreakpointObserver(): void {
    this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state: BreakpointState) => this.isMobile = state.matches);
  }
}
