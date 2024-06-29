import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/models/user-login.model';
import { AuthenticationService } from 'src/services/authentication.service';
import { CONSTANTS } from 'src/shared/constants';
import { ROUTES } from 'src/shared/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  readonly registerPath = '/' + ROUTES.register.path;
  readonly fieldUsername = CONSTANTS.FIELD_USER_USERNAME;
  readonly fieldPassword = CONSTANTS.FIELD_USER_PASSWORD;

  userData: FormGroup;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {}

  public ngOnInit(): void {
    this.initUserData();
  }

  public signIn(): void {
    this.authenticationService.signIn(this.getUserSignIn()).subscribe(() => {
      this.router.navigate([ROUTES.home.path]);
    });
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  private initUserData(): void {
    this.userData = this.formBuilder.group({
      [this.fieldUsername]: [null, Validators.required],
      [this.fieldPassword]: [null, Validators.required],
    });
  }

  private getUserSignIn(): UserLogin {
    return {
      username: this.userData.get(this.fieldUsername).value,
      password: this.userData.get(this.fieldPassword).value,
    };
  }
}
