import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {path:'dashboard',loadChildren:()=>DashboardModule},
  {path:'',pathMatch:'full',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'reg',component:RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
