import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';


@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent {
  calendarOptions: CalendarOptions = {
    plugins:[dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: [
      { title: 'Meeting', start: new Date() }
    ]
  };

}
