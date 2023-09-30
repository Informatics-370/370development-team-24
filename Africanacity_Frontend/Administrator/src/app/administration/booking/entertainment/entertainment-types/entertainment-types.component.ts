// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Entertainment_Type } from 'src/app/shared/entertainmentType';
// import { DataService } from 'src/app/service/data.Service';
// import { MatDialog } from '@angular/material/dialog';
// import { HelpViewentertainmentComponent } from './help-viewentertainment/help-viewentertainment.component';

// @Component({
//   selector: 'app-entertainment-types',
//   templateUrl: './entertainment-types.component.html',
//   styleUrls: ['./entertainment-types.component.css']
// })
// export class EntertainmentTypesComponent implements OnInit{
//   deletionSuccess = false;

//   constructor(
//     private dataService:DataService ,
//     private snackBar: MatSnackBar, 
//     private httpClient: HttpClient, 
//     private router: Router,  
//     private dialog: MatDialog){}

//   ngOnInit(): void {
//     this.GetEntertainmentTypes()
//     console.log(this.entertainments)
    
//     this.filteredTypes =this.entertainments;
//   }

//   entertainments: Entertainment_Type[] =[]
//   filteredTypes : Entertainment_Type[] =[]

//     GetEntertainmentTypes()
//     {
//       this.dataService.GetEntertainmentTypes().subscribe(result => {
//         let entertainmentList:any[] = result
//         entertainmentList.forEach((element) => {
//           this.entertainments.push(element)
          
//         });
//       })
//     }

//     applyFilter(event: Event) {
//       const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    
//       this.filteredTypes = this.entertainments.filter(entertainmentType => {
//         const column2Value = entertainmentType.name.toLowerCase() || entertainmentType.name.toUpperCase();
//         const column3Value = entertainmentType.description.toLowerCase();
    
//         return column2Value.includes(filterValue) || 
//         column3Value.includes(filterValue)
//       });
//     }


//     deleteItem(entertainment_TypeId: number): void {
//       const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete the Entertainer type?', ' Delete', { duration: 5000 });
      
//       confirmationSnackBar.onAction().subscribe(() => {
//         this.deleteItemFromServer(entertainment_TypeId); // Proceed with deletion if "Cancel Delete" is not clicked
//       });
//     }
  
//     deleteItemFromServer(entertainment_TypeId: number): void {
//       // Display another confirmation before the actual deletion
//       const confirmDeletionSnackBar = this.snackBar.open('Confirm deletion?', 'Delete', { duration: 5000 });
      
//       confirmDeletionSnackBar.onAction().subscribe(() => {
//         // User confirmed deletion, proceed with the actual deletion
//         this.DeleteEntertainmentType(entertainment_TypeId);
//       });
//     }
  
      
//     DeleteEntertainmentType(employee_RoleId: number) {
//       this.dataService.DeleteEntertainmentType(employee_RoleId).subscribe(
//         () => {
//           // Deletion was successful
//           this.deletionSuccess = true;
//           this.snackBar.open('Entertainment Type deleted successfully.', '', { duration: 5000 });
//           window.location.reload();
//         },
//         (error) => {
//           // Deletion failed
//           this.deletionSuccess = false;
//           this.snackBar.open('Cannot delete entertainmenttype because it is linked to entertainment and entertainer.', '', { duration: 5000 });
//         }
//       );
//     }
  
//     openHelpModal(field: string): void {
//       const dialogRef = this.dialog.open(HelpViewentertainmentComponent, {
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
import { Entertainment_Type } from 'src/app/shared/entertainmentType';
import { MatDialog } from '@angular/material/dialog';
import { HelpViewentertainmentComponent } from './help-viewentertainment/help-viewentertainment.component';

@Component({
  selector: 'app-entertainment-types',
  templateUrl: './entertainment-types.component.html',
  styleUrls: ['./entertainment-types.component.css']
})
export class EntertainmentTypesComponent implements OnInit {
  deletionSuccess = false;
  entertainments: Entertainment_Type[] = [];
  filteredTypes: Entertainment_Type[] = [];

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.GetEntertainmentTypes();
    this.filteredTypes = this.entertainments; // Initialize the filtered list
  }

  GetEntertainmentTypes() {
    this.dataService.GetEntertainmentTypes().subscribe((result) => {
      this.entertainments = result as Entertainment_Type[];
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredTypes = this.entertainments.filter((entertainmentType) => {
      const column2Value = entertainmentType.name.toLowerCase();
      const column3Value = entertainmentType.description.toLowerCase();

      return (
        column2Value.includes(filterValue) || column3Value.includes(filterValue)
      );
    });
  }

  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(HelpViewentertainmentComponent, {
      width: '500px',
      data: { field }
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle modal close if needed
    });
  }

  deleteItem(entertainment_TypeId: number): void {
    const confirmationSnackBar = this.snackBar.open(
      'Are you sure you want to delete the Entertainer type?',
      ' Delete',
      { duration: 5000 }
    );

    confirmationSnackBar.onAction().subscribe(() => {
      this.deleteItemFromServer(entertainment_TypeId); // Proceed with deletion if "Cancel Delete" is not clicked
    });
  }

  deleteItemFromServer(entertainment_TypeId: number): void {
    // Display another confirmation before the actual deletion
    const confirmDeletionSnackBar = this.snackBar.open(
      'Confirm deletion?',
      'Delete',
      { duration: 5000 }
    );

    confirmDeletionSnackBar.onAction().subscribe(() => {
      // User confirmed deletion, proceed with the actual deletion
      this.DeleteEntertainmentType(entertainment_TypeId);
    });
  }

  DeleteEntertainmentType(entertainment_TypeId: number) {
    this.dataService.DeleteEntertainmentType(entertainment_TypeId).subscribe(
      () => {
        // Deletion was successful
        this.deletionSuccess = true;
        this.snackBar.open('Entertainment Type deleted successfully.', '', {
          duration: 5000
        });
        window.location.reload();
      },
      (error) => {
        // Deletion failed
        this.deletionSuccess = false;
        this.snackBar.open(
          'Cannot delete entertainmenttype because it is linked to entertainment and entertainer.',
          '',
          { duration: 5000 }
        );
      }
    );
  }
}
