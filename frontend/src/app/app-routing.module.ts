import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guards/auth.guard';
import { ROUTES } from 'src/shared/routes';
import { LoginComponent } from 'src/views/login/login.component';
import { RegisterComponent } from 'src/views/register/register.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: ROUTES.index.path,
    component: AppComponent,
    canActivate: [AuthGuard]
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
