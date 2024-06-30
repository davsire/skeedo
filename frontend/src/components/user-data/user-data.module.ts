import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { UserDataComponent } from './user-data.component';

@NgModule({
  declarations: [
    UserDataComponent,
  ],
  exports: [
    UserDataComponent,
  ],
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserDataModule { }
