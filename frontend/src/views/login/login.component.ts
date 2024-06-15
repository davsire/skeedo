import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTES } from 'src/shared/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  readonly registerPath = '/' + ROUTES.register.path;
}
