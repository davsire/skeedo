import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateEventComponent } from './update-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';  
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    UpdateEventComponent
  ],
  exports: [
    UpdateEventComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule
  ]
})
export class UpdateEventModule { }
