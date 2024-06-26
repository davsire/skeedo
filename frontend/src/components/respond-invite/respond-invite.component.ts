import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { NotificationService } from 'src/services/notification.service';
import { CONSTANTS } from 'src/shared/constants';

@Component({
  selector: 'app-respond-invite',
  templateUrl: './respond-invite.component.html',
  styleUrls: ['./respond-invite.component.css']
})
export class RespondInviteComponent implements OnInit {

  @Input() openRespondInvite: Subject<any>;

  readonly fieldAvailableDays = CONSTANTS.FIELD_AVAILABLE_DAYS;

  destroyRef = inject(DestroyRef);
  modalVisible = false;
  invite: any;
  respondInviteData: FormGroup;

  constructor(
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.initRespondInviteData();
    this.openRespondInvite.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((invite) => {
      this.invite = invite;
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
    console.log(this.respondInviteData.getRawValue()); // @TODO: replace this mock to a call to update invite endpoint
    this.notificationService.success('Convite respondido! Agora é só esperar o evento ser marcado :)')
    this.closeModal();
  }

  private initRespondInviteData(): void {
    this.respondInviteData = this.formBuilder.group({
      [this.fieldAvailableDays]: [null, Validators.required],
    });
  }
}
