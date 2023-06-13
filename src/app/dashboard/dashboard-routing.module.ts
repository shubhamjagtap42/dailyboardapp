import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MycasesComponent } from './mycases/mycases.component';
import { NotificationComponent } from './notification/notification.component';
import { SettingsComponent } from './settings/settings.component';
import { DashHeaderComponent } from './dash-header/dash-header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalenderComponent } from './calender/calender.component';


const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'calender',component:CalenderComponent},
  {path:'case',component:MycasesComponent},
  {path:'notification',component:NotificationComponent},
  {path:'settings',component:SettingsComponent},
  {path:'dashhead',component:DashHeaderComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'',redirectTo:'dashboard',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
