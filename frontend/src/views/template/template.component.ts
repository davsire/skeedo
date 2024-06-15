import { Component, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
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
      icon: 'pi pi-user',
      label: 'Perfil',
      routerLink: this.profilePath,
    },
    {
      icon: 'pi pi-sign-out',
      label: 'Sair'
    },
  ];
}
