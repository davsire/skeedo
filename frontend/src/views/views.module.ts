import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { TemplateModule } from './template/template.module';
import { HomeModule } from './home/home.module';
import { ProfileModule } from './profile/profile.module';
import { InvitesModule } from './invites/invites.module';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    RegisterModule,
    TemplateModule,
    HomeModule,
    ProfileModule,
    InvitesModule,
  ],
  exports: [
    LoginModule,
    RegisterModule,
    TemplateModule,
    HomeModule,
    ProfileModule,
    InvitesModule,
  ]
})
export class ViewsModule { }
