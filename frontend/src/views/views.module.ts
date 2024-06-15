import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { TemplateModule } from './template/template.module';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    RegisterModule,
    TemplateModule,
  ],
  exports: [
    LoginModule,
    RegisterModule,
    TemplateModule,
  ]
})
export class ViewsModule { }
