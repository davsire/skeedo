import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/services/notification.service';
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
  ) {}

  public createUser(): void {
    console.log(this.userData.getRawValue()); // @TODO: replace this mock to a call to create user endpoint
    this.notificationService.success('Usuário cadastrado com sucesso! Agora é só fazer login');
    this.router.navigate([ROUTES.login.path]);
  }
}
