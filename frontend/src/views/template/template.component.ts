import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { AuthenticationService } from 'src/services/authentication.service';
import { ROUTES } from 'src/shared/routes';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TemplateComponent {

  readonly homePath = ROUTES.home.path;
  readonly profilePath = ROUTES.profile.path;
  readonly invitesPath = ROUTES.invites.path;
  readonly userMenuItems: MenuItem[] = [
    {
      label: 'Perfil',
      icon: PrimeIcons.USER,
      routerLink: this.profilePath,
    },
    {
      label: 'Sair',
      icon: PrimeIcons.SIGN_OUT,
      command: this.signOut.bind(this),
    },
  ];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {}

  public isCurrentRoute(route: string): boolean {
    return this.router.url.includes(route);
  }

  private signOut(): void {
    this.authenticationService.signOut();
    this.router.navigate([ROUTES.login.path]);
  }
}
