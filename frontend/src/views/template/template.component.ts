import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
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
    },
  ];

  constructor(private router: Router) {}

  public isCurrentRoute(route: string): boolean {
    return this.router.url.includes(route);
  }
}
