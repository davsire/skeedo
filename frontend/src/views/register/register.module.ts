import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { UserDataModule } from 'src/components/user-data/user-data.module';
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
    ButtonModule,
    UserDataModule,
  ]
})
export class RegisterModule { }
