import { Component, ViewChild, OnInit, TemplateRef } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // Import the dayGrid plugin
import interactionPlugin from '@fullcalendar/interaction';
import { AddScheduleComponent } from '../add-schedule/add-schedule.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/service/data.Service';



@Component({
  selector: 'app-schedule-display',
  templateUrl: './schedule-display.component.html',
  styleUrls: ['./schedule-display.component.css']
})

export class ScheduleDisplayComponent implements OnInit {
 
  private dialogRef: any;
  
  constructor(private dialog: MatDialog, private dataService: DataService){}


  ngOnInit() {

  }



  calendarOptions: CalendarOptions = {
   initialView: 'dayGridMonth',
     plugins: [dayGridPlugin, interactionPlugin],
     dateClick: this.handleDateClick.bind(this),
     events: [
      { title: 'music slot', date: '2023-07-19',color:'#2196F3'},
      {title: 'dance', date: '2023-07-23',color:'#2196F3'},
      {title: 'poetry', date: '2023-08-10'}
     ]
     
 };

 handleDateClick(arg: { dateStr: string; }) {
  alert('date click! ' + arg.dateStr)
}



}





