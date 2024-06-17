import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CONSTANTS } from 'src/shared/constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements AfterViewInit {

  userData: FormGroup;
  isEdicao = false;

  public ngAfterViewInit(): void {
    this.getUserData();
  }

  public toggleEdition(edit: boolean): void {
    this.isEdicao = edit;
  }

  public cancelEdit(): void {
    this.toggleEdition(false);
    this.userData.reset();
    this.getUserData();
  }

  public updateUser(): void {
    console.log(this.userData.getRawValue()); // temporary
  }

  private getUserData(): void {
    // this is a mock, change after the endpoint to get user data is done
    this.userData.get(CONSTANTS.FIELD_USER_NAME).setValue('Davi');
    this.userData.get(CONSTANTS.FIELD_USER_NICKNAME).setValue('davsire');
  }
}
