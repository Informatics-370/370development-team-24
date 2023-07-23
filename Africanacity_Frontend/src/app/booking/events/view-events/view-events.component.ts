import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Event } from 'src/app/shared/event';
import { DataService } from 'src/app/service/data.Service';

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css']
})

export class ViewEventsComponent implements OnInit{
  events: Event[]=[]
  Filteredevents : Event[]=[]
 
  constructor(private dataService:DataService ,private snackBar: MatSnackBar, private httpClient: HttpClient, private router: Router){}

   
   
    ngOnInit(): void {
      this.GetAllEvents()
    }

    GetAllEvents()
    {
      this.dataService.GetAllEvents().subscribe(result => {
        let eventsList:any[] = result
        eventsList.forEach((element) => {
          this.events.push(element)
          
        });
      })
    }

    // applyFilter(event: Event) {
    //   const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    
    //   this.Filteredevents = this.events.filter(event => {
    //     const column2Value = event.event_name.toLowerCase() || event.event_name.toUpperCase();
    //     const column3Value = event.description.toLowerCase();
    
    //     return column2Value.includes(filterValue) || 
    //     column3Value.includes(filterValue);
    //   });
    // }
  

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
