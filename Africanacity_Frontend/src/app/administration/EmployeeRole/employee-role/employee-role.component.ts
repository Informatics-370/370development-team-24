import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.Service';
import { Employee_Role } from 'src/app/shared/EmployeeRole';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-employee-role',
  templateUrl: './employee-role.component.html',
  styleUrls: ['./employee-role.component.css'],
  template: '<button (click)="deleteItem()">Delete</button>'
})
export class EmployeeRoleComponent implements OnInit{

employeeroles:Employee_Role[] = []

constructor(private dataService: DataService, 
  private router: Router, 
  private http:HttpClient,
  private snackBar: MatSnackBar) { }

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
    
    searchTerm: string = '';

    

    // search(searchTerm: string) {
    //   this.searchClicked.emit(searchTerm);
    // }
}
