import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookingEvent } from 'src/app/shared/bookingevent';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/service/data.Service';
import { HelpVieweventsComponent } from './help-viewevents/help-viewevents.component';

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css']
})

export class ViewEventsComponent implements OnInit{
  bookingevents: BookingEvent[]=[]
  Filteredevents : BookingEvent[]=[]
 
  constructor(private dataService:DataService ,private snackBar: MatSnackBar, private httpClient: HttpClient, 
    private router: Router,  private dialog: MatDialog){}

   
   
    ngOnInit(): void {
      this.GetAllEvents()
      console.log(this.bookingevents)

      this.Filteredevents=this.bookingevents;

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
    const column2Value = bookingevent.name.toLowerCase() || bookingevent.name.toUpperCase();
    const column3Value = bookingevent.description.toLowerCase();
    
    return column2Value.includes(filterValue) || 
     column3Value.includes(filterValue);
    });
   }
  
   deleteItemFromServer(): void{
    this.DeleteEvent;
  }

    deleteItem(): void {
      const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete this event?', 'Delete , Cancel',{
        duration: 5000, // Display duration in milliseconds
  
      });
      confirmationSnackBar.onAction().subscribe(() => {
        this.deleteItemFromServer();
       window.location.reload();
      })
    }


    DeleteEvent(eventId: Number){
      this.dataService.DeleteEvent(eventId).subscribe(result => {
        this.deleteItem();
        });
    }



    openHelpModal(field: string): void {
      const dialogRef = this.dialog.open(HelpVieweventsComponent, {
        width: '500px',
        data: { field } // Pass the field name to the modal
      });
    
      dialogRef.afterClosed().subscribe(result => {
        // Handle modal close if needed
      });
    }










}
