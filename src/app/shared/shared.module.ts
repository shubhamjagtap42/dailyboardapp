import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { TabMenuModule } from 'primeng/tabmenu';
import { DialogModule } from 'primeng/dialog';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BadgeModule } from 'primeng/badge';
import { NgMarqueeModule } from 'ng-marquee';
import { CalendarModule } from 'primeng/calendar';
import { FullCalendarModule } from '@fullcalendar/angular';









@NgModule({
  declarations: [],
  imports: [
    CardModule,
    FormsModule,
    TabMenuModule,
    DialogModule,
    TimelineModule,
    ButtonModule,
    ConfirmDialogModule,
    TableModule,
    ToastModule,
    
  ],
  exports: [
    CardModule,
    FormsModule,
    TabMenuModule,
    DialogModule,
    TimelineModule,
    ButtonModule,
    ConfirmDialogModule,
    TableModule,
    ToastModule,
    BrowserAnimationsModule,
    BadgeModule,
    NgMarqueeModule,
    CalendarModule,
    FullCalendarModule,
    CommonModule,
    
    
    
  ]
})
export class SharedModule { }
