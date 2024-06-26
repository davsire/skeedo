import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NotificationService } from 'src/services/notification.service';
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

  constructor(private notificationService: NotificationService) {}

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
    console.log(this.userData.getRawValue()); // @TODO: replace this mock to a call to update user endpoint
    this.notificationService.success('Cadastro atualizado com sucesso!');
    this.cancelEdit();
  }

  private getUserData(): void {
    // @TODO: replace this mock to a call to get user data endpoint
    this.userData.get(CONSTANTS.FIELD_USER_NAME).setValue('Davi');
    this.userData.get(CONSTANTS.FIELD_USER_USERNAME).setValue('davsire');
  }
}
