import { Component, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TemplateComponent {

  readonly userMenuItems: MenuItem[] = [
    {
      icon: 'pi pi-user',
      label: 'Perfil'
    },
    {
      icon: 'pi pi-sign-out',
      label: 'Sair'
    },
  ];
}
