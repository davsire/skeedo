import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'src/models/user.model';
import { NotificationService } from 'src/services/notification.service';
import { SessionService } from 'src/services/session.service';
import { UserService } from 'src/services/user.service';
import { CONSTANTS } from 'src/shared/constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements AfterViewInit {

  userData: FormGroup;
  isEdition = false;

  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    private sessionService: SessionService,
  ) {}

  public ngAfterViewInit(): void {
    this.getUserData();
  }

  public toggleEdition(edit: boolean): void {
    this.isEdition = edit;
  }

  public cancelEdit(): void {
    this.toggleEdition(false);
    this.userData.reset();
    this.getUserData();
  }

  public updateUser(): void {
    this.userService.updateUserById(this.sessionService.getUserId(), this.getUserUpdateData()).subscribe(() => {
      this.notificationService.success('Cadastro atualizado com sucesso!');
      this.cancelEdit();
    });
  }

  private getUserData(): void {
    this.userService.getUserById(this.sessionService.getUserId()).subscribe((user: User) => {
      this.userData.get(CONSTANTS.FIELD_USER_NAME).setValue(user.displayName);
      this.userData.get(CONSTANTS.FIELD_USER_USERNAME).setValue(user.username);
    });
  }

  private getUserUpdateData(): User {
    return {
      displayName: this.userData.get(CONSTANTS.FIELD_USER_NAME).value,
      username: this.userData.get(CONSTANTS.FIELD_USER_USERNAME).value,
      password: this.userData.get(CONSTANTS.FIELD_USER_PASSWORD).value,
    };
  }
}
