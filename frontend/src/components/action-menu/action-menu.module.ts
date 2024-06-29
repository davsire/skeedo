import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ActionMenuComponent } from './action-menu.component';

@NgModule({
  declarations: [
    ActionMenuComponent
  ],
  exports: [
    ActionMenuComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    MenuModule,
  ]
})
export class ActionMenuModule { }
