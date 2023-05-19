import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.Service';
import { Employee_Role } from 'src/app/shared/EmployeeRole';


@Component({
  selector: 'app-employee-role',
  templateUrl: './employee-role.component.html',
  styleUrls: ['./employee-role.component.css']
})
export class EmployeeRoleComponent implements OnInit{
employeerole:Employee_Role[] = []

constructor(private dataService: DataService, private router: Router) { }

  ngOnInit():void {
  this.getEmployeeRoles()
  }

  getEmployeeRoles()
  {
    this.dataService.getEmployeeRoles().subscribe(result => {
      let employeeRoleList:any[] = result
      employeeRoleList.forEach((element) => {
        this.employeerole.push(element)
      });
    })
  }

  deleteEmployeeRole(Employee_RoleId: Number){
    this.dataService.deleteEmployeeRole(Employee_RoleId).subscribe(result => {
      window.location.reload();
      });
    }
}
