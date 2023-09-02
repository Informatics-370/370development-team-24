import { Component,OnInit } from '@angular/core';
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
  template: '<button (click)="deleteItem()">Delete</button>'
})
export class EmployeeRoleComponent implements OnInit{

employeeroles:Employee_Role[] = []
filteredemployeeroles:Employee_Role[]=[];


constructor(private dataService: DataService, 
  private router: Router, 
  private http:HttpClient,
  private snackBar: MatSnackBar, private dialog: MatDialog) { }

  // message box
  deleteItem(): void{
 
    const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete the employee role?','Delete',{
        duration: 5000,
      });
     
      confirmationSnackBar.onAction().subscribe(() => {
        this.deleteItemFromServer();
       window.location.reload();
      })

  }

  deleteItemFromServer(): void{
    this.DeleteEmployeeRole;
  }


  ngOnInit():void {
  this.GetAllEmployeeRoles()

  this.filteredemployeeroles= this.employeeroles
  console.log(this.filteredemployeeroles)
  }
  // Get all employees method
  GetAllEmployeeRoles()
  {
    this.dataService.GetAllEmployeeRoles().subscribe(result => {
      let employeeRoleList:any[] = result
      employeeRoleList.forEach((element) => {
        this.employeeroles.push(element)
      });
    })
  }
 // Delete Employee role method
  DeleteEmployeeRole(employee_RoleId: Number){
    this.dataService.DeleteEmployeeRole(employee_RoleId).subscribe(result => {
      this.deleteItem();
      });
    }   
    
  //filter method
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  
    this.filteredemployeeroles = this.employeeroles.filter(EmployeeRole => {
      const column2Value = EmployeeRole.name.toLowerCase() || EmployeeRole.name.toUpperCase();
      const column3Value = EmployeeRole.description.toLowerCase();
      
  
      return column2Value.includes(filterValue) || 
      column3Value.includes(filterValue);

    });
  }

  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(HelpViewemployeeroleComponent, {
      width: '500px',
      data: { field } // Pass the field name to the modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle modal close if needed
    });
  }

    
}
