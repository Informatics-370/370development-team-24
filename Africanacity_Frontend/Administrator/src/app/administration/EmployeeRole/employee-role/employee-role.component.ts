// import { Component,OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { DataService } from 'src/app/service/data.Service';
// import { Employee_Role } from 'src/app/shared/EmployeeRole';
// import { HttpClient } from '@angular/common/http';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatDialog } from '@angular/material/dialog';
// import { HelpViewemployeeroleComponent } from './help-viewemployeerole/help-viewemployeerole.component';


// @Component({
//   selector: 'app-employee-role',
//   templateUrl: './employee-role.component.html',
//   styleUrls: ['./employee-role.component.css'],
//   template: '<button (click)="deleteItem()">Delete</button>'
// })
// export class EmployeeRoleComponent implements OnInit{

// employeeroles:Employee_Role[] = []
// filteredemployeeroles:Employee_Role[]=[];
// deletionSuccess = false;

// constructor(private dataService: DataService, 
//   private router: Router, 
//   private http:HttpClient,
//   private snackbar: MatSnackBar, 
//   private dialog: MatDialog) { }


//   deleteItem(employee_RoleId: number): void {
//     const confirmationSnackBar = this.snackbar.open('Are you sure you want to delete the employee role?', 'Cancel Delete', { duration: 5000 });
    
//     confirmationSnackBar.onAction().subscribe(() => {
//       this.deleteItemFromServer(employee_RoleId); // Proceed with deletion if "Cancel Delete" is not clicked
//     });
//   }

//   deleteItemFromServer(employee_RoleId: number): void {
//     // Display another confirmation before the actual deletion
//     const confirmDeletionSnackBar = this.snackbar.open('Confirm deletion?', 'Delete', { duration: 5000 });
    
//     confirmDeletionSnackBar.onAction().subscribe(() => {
//       // User confirmed deletion, proceed with the actual deletion
//       this.DeleteEmployeeRole(employee_RoleId);
//     });
//   }

    
//   DeleteEmployeeRole(employee_RoleId: number) {
//     this.dataService.DeleteEmployeeRole(employee_RoleId).subscribe(
//       () => {
//         // Deletion was successful
//         this.deletionSuccess = true;
//         this.snackbar.open('Employee role deleted successfully.', '', { duration: 5000 });
//         window.location.reload();
//       },
//       (error) => {
//         // Deletion failed
//         this.deletionSuccess = false;
//         this.snackbar.open('Cannot delete employee role because it is linked to employee.', '', { duration: 5000 });
//       }
//     );
//   }

//   ngOnInit():void {
//   this.GetAllEmployeeRoles()

//   this.filteredemployeeroles= this.employeeroles
//   console.log(this.filteredemployeeroles)
//   }
//   // Get all employees method
//   GetAllEmployeeRoles()
//   {
//     this.dataService.GetAllEmployeeRoles().subscribe(result => {
//       let employeeRoleList:any[] = result
//       employeeRoleList.forEach((element) => {
//         this.employeeroles.push(element)
//       });
//     })
//   }
    
//   //filter method
//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  
//     this.filteredemployeeroles = this.employeeroles.filter(EmployeeRole => {
//       const column2Value = EmployeeRole.name.toLowerCase() || EmployeeRole.name.toUpperCase();
//       const column3Value = EmployeeRole.description.toLowerCase();
      
  
//       return column2Value.includes(filterValue) || 
//       column3Value.includes(filterValue);

//     });
//   }

//   openHelpModal(field: string): void {
//     const dialogRef = this.dialog.open(HelpViewemployeeroleComponent, {
//       width: '500px',
//       data: { field } // Pass the field name to the modal
//     });
  
//     dialogRef.afterClosed().subscribe(result => {
//       // Handle modal close if needed
//     });
//   }

    
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.Service';
import { Employee_Role } from 'src/app/shared/EmployeeRole';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HelpViewemployeeroleComponent } from './help-viewemployeerole/help-viewemployeerole.component';

@Component({
  selector: 'app-employee-role',
  templateUrl: './employee-role.component.html',
  styleUrls: ['./employee-role.component.css'],
})
export class EmployeeRoleComponent implements OnInit {
  employeeroles: Employee_Role[] = [];
  filteredemployeeroles: Employee_Role[] = [];
  deletionSuccess = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.GetAllEmployeeRoles();
  }

  GetAllEmployeeRoles() {
    this.dataService.GetAllEmployeeRoles().subscribe((result) => {
      this.employeeroles = result as Employee_Role[];
      this.filteredemployeeroles = this.employeeroles; // Initialize the filtered list
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredemployeeroles = this.employeeroles.filter((EmployeeRole) => {
      const column2Value = EmployeeRole.name.toLowerCase();
      const column3Value = EmployeeRole.description.toLowerCase();

      return (
        column2Value.includes(filterValue) || column3Value.includes(filterValue)
      );
    });
  }

  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(HelpViewemployeeroleComponent, {
      width: '500px',
      data: { field },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle modal close if needed
    });
  }

  deleteItem(employee_RoleId: number): void {
    const confirmationSnackBar = this.snackbar.open(
      'Are you sure you want to delete the employee role?',
      'Cancel Delete',
      { duration: 5000 }
    );

    confirmationSnackBar.onAction().subscribe(() => {
      this.deleteItemFromServer(employee_RoleId); // Proceed with deletion if "Cancel Delete" is not clicked
    });
  }

  deleteItemFromServer(employee_RoleId: number): void {
    // Display another confirmation before the actual deletion
    const confirmDeletionSnackBar = this.snackbar.open(
      'Confirm deletion?',
      'Delete',
      { duration: 5000 }
    );

    confirmDeletionSnackBar.onAction().subscribe(() => {
      // User confirmed deletion, proceed with the actual deletion
      this.DeleteEmployeeRole(employee_RoleId);
    });
  }

  DeleteEmployeeRole(employee_RoleId: number) {
    this.dataService.DeleteEmployeeRole(employee_RoleId).subscribe(
      () => {
        // Deletion was successful
        this.deletionSuccess = true;
        this.snackbar.open('Employee role deleted successfully.', '', {
          duration: 5000,
        });
        window.location.reload();
      },
      (error) => {
        // Deletion failed
        this.deletionSuccess = false;
        this.snackbar.open(
          'Cannot delete employee role because it is linked to an employee.',
          '',
          { duration: 5000 }
        );
      }
    );
  }
}
