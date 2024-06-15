import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { TemplateComponent } from './template.component';

@NgModule({
  declarations: [
    TemplateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    MenuModule,
    TooltipModule,
  ]
})
export class TemplateModule { }
