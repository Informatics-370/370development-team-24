import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.Service';
import { Employee_Role } from 'src/app/shared/EmployeeRole';

@Component({
  selector: 'app-edit-employee-role',
  templateUrl: './edit-employee-role.component.html',
  styleUrls: ['./edit-employee-role.component.css']
})
export class EditEmployeeRoleComponent implements OnInit {

  employeeroleForm = new FormGroup({
    Name: new FormControl(''),
    Description: new FormControl(''),
    EmployeeId : new FormControl (0)
  })


  EmployeeRole:any
  constructor(private dataService: DataService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.dataService.getEmployeeRole(+this.route.snapshot.params['id']).subscribe(result => {
      this.EmployeeRole = result
      this.employeeroleForm.patchValue({
        Name: this.EmployeeRole.name,
        Description: this.EmployeeRole.description,
        EmployeeId : this.EmployeeRole.EmployeeId
      });
  })
  }

  cancel(){
    this.router.navigate(['/employeerole'])
  }

  onSubmit(){
    this.dataService.editEmployeeRole(this.EmployeeRole.Employee_RoleId, this.employeeroleForm.value).subscribe(result => {
          this.router.navigate(['/employeerole'])
    })
  }

}
