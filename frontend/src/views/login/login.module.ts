import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
  ]
})
export class LoginModule { }
