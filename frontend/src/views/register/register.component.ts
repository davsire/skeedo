import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTES } from 'src/shared/routes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {

  readonly loginPath = '/' + ROUTES.login.path;
}
