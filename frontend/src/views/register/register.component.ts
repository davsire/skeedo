import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/models/user.model';
import { AuthenticationService } from 'src/services/authentication.service';
import { NotificationService } from 'src/services/notification.service';
import { CONSTANTS } from 'src/shared/constants';
import { ROUTES } from 'src/shared/routes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {

  readonly loginPath = '/' + ROUTES.login.path;
  userData: FormGroup;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService,
  ) {}

  public createUser(): void {
    this.authenticationService.signUp(this.getUserSignUp()).subscribe(() => {
      this.notificationService.success('Cadastro realizado com sucesso! Bem-vindo :)');
      this.router.navigate([ROUTES.home.path]);
    });
  }

  private getUserSignUp(): User {
    return {
      displayName: this.userData.get(CONSTANTS.FIELD_USER_NAME).value,
      username: this.userData.get(CONSTANTS.FIELD_USER_USERNAME).value,
      password: this.userData.get(CONSTANTS.FIELD_USER_PASSWORD).value,
    };
  }
}
