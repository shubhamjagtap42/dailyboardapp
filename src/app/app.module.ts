import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { NotificationService } from 'src/services/notification.service';
import { BadgeModule } from 'primeng/badge';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from 'src/services/login.service';












@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,

  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    DashboardModule,
    HttpClientModule,
    FormsModule,
    BadgeModule,
    BrowserAnimationsModule,




  ],
  providers: [ConfirmationService,MessageService,NotificationService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
