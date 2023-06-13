import { NgModule } from '@angular/core';
import { CommonModule,DatePipe  } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { MycasesComponent } from './mycases/mycases.component';
import { SettingsComponent } from './settings/settings.component';
import { NotificationComponent } from './notification/notification.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashHeaderComponent } from './dash-header/dash-header.component';
import { SharedModule } from '../shared/shared.module';
import { NotificationService } from 'src/services/notification.service';
import { BadgeModule } from 'primeng/badge';
import { CalenderComponent } from './calender/calender.component';
import { MessageService } from 'primeng/api';








@NgModule({
  declarations: [
    HomeComponent,
    MycasesComponent,
    SettingsComponent,
    NotificationComponent,
    DashboardComponent,
    DashHeaderComponent,
    CalenderComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    BadgeModule,

    


  ],
  providers: [DatePipe,NotificationService]
})
export class DashboardModule { }
