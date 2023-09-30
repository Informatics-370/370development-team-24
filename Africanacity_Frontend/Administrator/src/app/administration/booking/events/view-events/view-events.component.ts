// import { Component, OnInit} from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { BookingEvent } from 'src/app/shared/bookingevent';
// import { MatDialog } from '@angular/material/dialog';
// import { DataService } from 'src/app/service/data.Service';
// import { HelpVieweventsComponent } from './help-viewevents/help-viewevents.component';

// @Component({
//   selector: 'app-view-events',
//   templateUrl: './view-events.component.html',
//   styleUrls: ['./view-events.component.css']
// })

// export class ViewEventsComponent implements OnInit{
//   bookingevents: BookingEvent[]=[]
//   Filteredevents : BookingEvent[]=[]
//   deletionSuccess = false;

//   constructor(private dataService:DataService ,
//     private snackBar: MatSnackBar, 
//     private httpClient: HttpClient, 
//     private router: Router,  
//     private dialog: MatDialog){}

   
   
//     ngOnInit(): void {
//       this.GetAllEvents()
//       console.log(this.bookingevents)

//       this.Filteredevents=this.bookingevents;

//     }

//     GetAllEvents()
//     {
//       this.dataService.GetAllEvents().subscribe(result => {
//         let eventsList:any[] = result
//         eventsList.forEach((element) => {
//           this.bookingevents.push(element)
          
//         });
//       })
//     }

//     applyFilter(event: Event) {
//      const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    
//     this.Filteredevents = this.bookingevents.filter(bookingevent => {
//     const column2Value = bookingevent.name.toLowerCase() || bookingevent.name.toUpperCase();
//     const column3Value = bookingevent.description.toLowerCase();
    
//     return column2Value.includes(filterValue) || 
//      column3Value.includes(filterValue);
//     });
//    }
  
//   deleteItem(eventId: number): void {
//     const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete the Event?', ' Delete', { duration: 5000 });
    
//     confirmationSnackBar.onAction().subscribe(() => {
//       this.deleteItemFromServer(eventId); // Proceed with deletion if "Cancel Delete" is not clicked
//     });
//   }

//   deleteItemFromServer(eventId: number): void {
//     // Display another confirmation before the actual deletion
//     const confirmDeletionSnackBar = this.snackBar.open('Confirm deletion?', 'Delete', { duration: 5000 });
    
//     confirmDeletionSnackBar.onAction().subscribe(() => {
//       // User confirmed deletion, proceed with the actual deletion
//       this.DeleteEvent(eventId);
//     });
//   }

    
//   DeleteEvent(eventId: number) {
//     this.dataService.DeleteEvent(eventId).subscribe(
//       () => {
//         // Deletion was successful
//         this.deletionSuccess = true;
//         this.snackBar.open('Event deleted successfully.', '', { duration: 3000 });
//         window.location.reload();
//       },
//       (error) => {
//         // Deletion failed
//         this.deletionSuccess = false;
//         this.snackBar.open('Cannot delete event because it is linked to schedule.', '', { duration: 3000 });
//       }
//     );
//   }

//     openHelpModal(field: string): void {
//       const dialogRef = this.dialog.open(HelpVieweventsComponent, {
//         width: '500px',
//         data: { field } // Pass the field name to the modal
//       });
    
//       dialogRef.afterClosed().subscribe(result => {
//         // Handle modal close if needed
//       });
//     }

// }

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/service/data.Service';
import { BookingEvent } from 'src/app/shared/bookingevent';
import { MatDialog } from '@angular/material/dialog';
import { HelpVieweventsComponent } from './help-viewevents/help-viewevents.component';

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css']
})

export class ViewEventsComponent implements OnInit {
  bookingevents: BookingEvent[] = [];
  Filteredevents: BookingEvent[] = [];
  deletionSuccess = false;

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.GetAllEvents();
    this.Filteredevents = this.bookingevents; // Initialize the filtered list
    console.log(this.Filteredevents)
  }

  // GetAllEvents() {
  //   this.dataService.GetAllEvents().subscribe((result) => {
  //     this.bookingevents = result as BookingEvent[];
  //   });
  // }

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

    this.Filteredevents = this.bookingevents.filter((bookingevent) => {
      const column2Value = bookingevent.name.toLowerCase();
      const column3Value = bookingevent.description.toLowerCase();

      return column2Value.includes(filterValue) || column3Value.includes(filterValue);
    });
  }

  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(HelpVieweventsComponent, {
      width: '500px',
      data: { field }
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle modal close if needed
    });
  }

  deleteItem(eventId: number): void {
    const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete the Event?', ' Delete', { duration: 5000 });

    confirmationSnackBar.onAction().subscribe(() => {
      this.deleteItemFromServer(eventId); // Proceed with deletion if "Cancel Delete" is not clicked
    });
  }

  deleteItemFromServer(eventId: number): void {
    // Display another confirmation before the actual deletion
    const confirmDeletionSnackBar = this.snackBar.open('Confirm deletion?', 'Delete', { duration: 5000 });

    confirmDeletionSnackBar.onAction().subscribe(() => {
      // User confirmed deletion, proceed with the actual deletion
      this.DeleteEvent(eventId);
    });
  }

  DeleteEvent(eventId: number) {
    this.dataService.DeleteEvent(eventId).subscribe(
      () => {
        // Deletion was successful
        this.deletionSuccess = true;
        this.snackBar.open('Event deleted successfully.', '', { duration: 3000 });
        window.location.reload();
      },
      (error) => {
        // Deletion failed
        this.deletionSuccess = false;
        this.snackBar.open('Cannot delete event because it is linked to schedule.', '', { duration: 3000 });
      }
    );
  }
}
