import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { UserDataModule } from 'src/components/user-data/user-data.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    UserDataModule,
  ]
})
export class ProfileModule { }
