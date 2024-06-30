import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { User } from 'src/models/user.model';
import { NotificationService } from 'src/services/notification.service';
import { UserService } from 'src/services/user.service';
import { CONSTANTS } from 'src/shared/constants';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css']
})
export class EventModalComponent implements OnInit {

  readonly fieldEventName = CONSTANTS.FIELD_EVENT_NAME;
  readonly fieldDateRange = CONSTANTS.FIELD_DATE_RANGE;
  readonly fieldParticipants = CONSTANTS.FIELD_PARTICIPANTS;
  readonly searchFields = ['displayName' ,'username'];
  readonly today = new Date();

  eventData: FormGroup;
  modalVisible = false;
  users: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private userService: UserService,
  ) {}

  public ngOnInit(): void {
    this.getUsers();
    this.initEventData();
  }

  public openModal(): void {
    this.modalVisible = true;
  }

  public closeModal(): void {
    this.modalVisible = false;
    this.clearEventData();
  }

  public clearEventData(): void {
    this.eventData.reset();
  }

  public createEvent(): void {
    console.log(this.eventData.getRawValue()); // @TODO: replace this mock to a call to create event endpoint
    this.notificationService.success('Evento cadastrado com sucesso!');
    this.closeModal();
  }

  private getUsers(): void {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  private initEventData(): void {
    this.eventData = this.formBuilder.group({
      [this.fieldEventName]: [null, Validators.required],
      [this.fieldDateRange]: [null, [Validators.required, this.dateRangeValidator]],
      [this.fieldParticipants]: [[], Validators.required],
    });
  }

  private dateRangeValidator(control: AbstractControl): ValidationErrors {
    if (!control.value || control.value.filter(date => date).length == 2) {
      return null;
    }
    return {notDateRange: true};
  }
}
