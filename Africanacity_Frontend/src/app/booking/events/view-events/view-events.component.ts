import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookingEvent } from 'src/app/shared/bookingevent';
import { DataService } from 'src/app/service/data.Service';

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css']
})

export class ViewEventsComponent implements OnInit{
  bookingevents: BookingEvent[]=[]
  Filteredevents : BookingEvent[]=[]
 
  constructor(private dataService:DataService ,private snackBar: MatSnackBar, private httpClient: HttpClient, private router: Router){}

   
   
    ngOnInit(): void {
      this.GetAllEvents()
      console.log(this.bookingevents)

    }

    GetAllEvents()
    {
      this.dataService.GetAllEvents().subscribe(result => {
        let eventsList:any[] = result
        eventsList.forEach((element) => {
          this.bookingevents.push(element)
          
        });
      })
    }

    applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    
    this.Filteredevents = this.bookingevents.filter(bookingevent => {
    const column2Value = bookingevent.event_Name.toLowerCase() || bookingevent.event_Name.toUpperCase();
    const column3Value = bookingevent.description.toLowerCase();
    
    return column2Value.includes(filterValue) || 
     column3Value.includes(filterValue);
    });
   }
  

    deleteItem(): void {
      const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete this event?', 'Delete, Cancel',{
        duration: 5000, // Display duration in milliseconds
  
      });
    }


    DeleteEvent(eventId: Number){
      this.dataService.DeleteEvent(eventId).subscribe(result => {
        this.deleteItem();
        });
    }













}
