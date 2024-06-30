import { Injectable } from '@angular/core';
import { MessageService, PrimeIcons } from 'primeng/api'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private static readonly NOTIFICATION_LIFE = 5000;

  constructor(private messageService: MessageService) {
  }

  public success(msg: string) {
    this.add(msg, 'success', PrimeIcons.CHECK_CIRCLE);
  }

  public error(msg: string) {
    this.add(msg, 'error', PrimeIcons.TIMES_CIRCLE);
  }

  public info(msg: string) {
    this.add(msg, 'info', PrimeIcons.INFO_CIRCLE);
  }

  private add(detail: string, severity: string, icon?: string) {
    this.messageService.add({ detail, severity, icon, life: NotificationService.NOTIFICATION_LIFE });
  }
}
