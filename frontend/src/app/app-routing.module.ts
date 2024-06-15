import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guards/auth.guard';
import { ROUTES } from 'src/shared/routes';
import { HomeComponent } from 'src/views/home/home.component';
import { InvitesComponent } from 'src/views/invites/invites.component';
import { LoginComponent } from 'src/views/login/login.component';
import { ProfileComponent } from 'src/views/profile/profile.component';
import { RegisterComponent } from 'src/views/register/register.component';
import { TemplateComponent } from 'src/views/template/template.component';

const routes: Routes = [
  {
    path: ROUTES.index.path,
    component: TemplateComponent,
    canActivate: [AuthGuard],
    children: [
      { path: ROUTES.index.path, redirectTo: ROUTES.home.path, pathMatch: 'full' },
      {
        path: ROUTES.home.path,
        component: HomeComponent,
      },
      {
        path: ROUTES.profile.path,
        component: ProfileComponent,
      },
      {
        path: ROUTES.invites.path,
        component: InvitesComponent,
      },
    ],
  },
  {
    path: ROUTES.login.path,
    component: LoginComponent,
  },
  {
    path: ROUTES.register.path,
    component: RegisterComponent,
  },
  {
    path: '**',
    redirectTo: ROUTES.index.path,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
