import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from 'src/shared/routes';
import { LoginComponent } from 'src/views/login/login.component';

const routes: Routes = [
  {
    path: ROUTES.login.path,
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
