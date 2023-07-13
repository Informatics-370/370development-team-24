import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/shared/employee';
import { EmployeeService } from 'src/app/service/employee.service';



@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  template: `
  <button (click)="deleteItem()">Delete</button>
`,


  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent {
  employees:Employee[] = []
  searchTerm!: string;
  // Employee!: Employee[];
  filteredEmployees: Employee[] = [];

  constructor(private employeeservice: EmployeeService, private router: Router, private httpClient: HttpClient, private snackBar: MatSnackBar){}
  

  deleteItem(): void {
    const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete this item?', 'Delete Cancel',{
      duration: 5000, // Display duration in milliseconds
    });

    
    // cancel(){
    //   this.router.navigate(['/home'])
    // }
  

    confirmationSnackBar.onAction().subscribe(() => {
      // Perform the deletion action here
      this.deleteItemFromServer();
      window.location.reload();
    });
  }
  deleteItemFromServer(): void {
    this.deleteEmployee;
  }

  ngOnInit(): void{
    this.GetAllEmployees()
    console.log(this.employees)
  }

  GetAllEmployees()
  {
    this.employeeservice.GetAllEmployees().subscribe(result => {
      let employeeList:any[] = result
      employeeList.forEach((element) => {
        this.employees.push(element)
        
      });
    })
  }

   deleteEmployee(employeeId: Number){
    this.employeeservice.deleteEmployee(employeeId).subscribe(result => {
      this.deleteItem();
      });
    }

    // searchTerm: string = '';

    // @Output() searchClicked: EventEmitter<string> = new EventEmitter<string>();

    // search(searchTerm: string) {
    //   this.searchClicked.emit(searchTerm);
    // }
    search() {
      if (this.searchTerm) {
        this.filteredEmployees = this.employees.filter(employee =>
          employee.firstName.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      } else {
        this.filteredEmployees = this.employees;
      }
    }

}

