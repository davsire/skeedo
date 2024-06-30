import { Component, DestroyRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Invite } from 'src/models/invite.model';
import { InviteService } from 'src/services/invite.service';
import { NotificationService } from 'src/services/notification.service';
import { CONSTANTS } from 'src/shared/constants';

@Component({
  selector: 'app-respond-invite',
  templateUrl: './respond-invite.component.html',
  styleUrls: ['./respond-invite.component.css']
})
export class RespondInviteComponent implements OnInit {

  @Input() openRespondInvite: Subject<Invite>;
  @Output() inviteResponded = new EventEmitter<void>();

  readonly fieldAvailableDays = CONSTANTS.FIELD_AVAILABLE_DAYS;

  destroyRef = inject(DestroyRef);
  modalVisible = false;
  invite: Invite;
  respondInviteData: FormGroup;

  constructor(
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private inviteService: InviteService,
  ) {}

  public ngOnInit(): void {
    this.initRespondInviteData();
    this.openRespondInvite.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((invite) => {
      this.invite = invite;
      this.invite.event.beginDate = new Date(this.invite.event.beginDate);
      this.invite.event.endDate = new Date(this.invite.event.endDate);
      this.modalVisible = true;
    });
  }

  public closeModal(): void {
    this.modalVisible = false;
    this.clearRespondInviteData();
  }

  public clearRespondInviteData(): void {
    this.respondInviteData.reset();
  }

  public respondInvite(): void {
    this.inviteService.respondInvite(this.invite._id, this.getInviteData()).subscribe(() => {
      this.notificationService.success('Convite respondido! Agora é só esperar o evento ser marcado :)')
      this.inviteResponded.next();
      this.closeModal();
    });
  }

  private initRespondInviteData(): void {
    this.respondInviteData = this.formBuilder.group({
      [this.fieldAvailableDays]: [null, Validators.required],
    });
  }

  private getInviteData(): Invite {
    return {
      availableDays: this.respondInviteData.get(this.fieldAvailableDays).value,
    };
  }
}
