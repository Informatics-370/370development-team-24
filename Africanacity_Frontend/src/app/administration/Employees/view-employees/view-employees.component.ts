import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../shared/employee';



@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent {
  employees:Employee[] = []

  constructor(private employeeservice: EmployeeService, private router: Router){}
  
  ngOnInit(): void{
    this.getAllEmployees()
  }

  getAllEmployees()
  {
    this.employeeservice.getAllEmployees().subscribe(result => {
      let employeeList:any[] = result
      employeeList.forEach((element) => {
        this.employees.push(element)
      });
    })
  }

  DeleteEmployee(EmployeeId: Number){
    this.employeeservice.DeleteEmployee(EmployeeId).subscribe(result => {
      window.location.reload();
      });
    }


}
