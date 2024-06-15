import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [
    RegisterComponent,
  ],
  exports: [
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    InputTextModule,
    ButtonModule,
  ]
})
export class RegisterModule { }
