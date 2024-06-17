import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  public createUser(): void {
    console.log(this.userData.getRawValue()); // temporary
  }
}
