import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.Service';
import { Employee_Role } from 'src/app/shared/EmployeeRole';

@Component({
  selector: 'app-edit-employee-role',
  templateUrl: './edit-employee-role.component.html',
  styleUrls: ['./edit-employee-role.component.css']
})
export class EditEmployeeRoleComponent{

 
  constructor(private dataService: DataService, private router: Router, private route:ActivatedRoute) { }

  editEmployeeRole: Employee_Role = new Employee_Role();

  updateEmployeeRoleForm: FormGroup = new FormGroup({
     Name: new FormControl('',[Validators.required]),
    Description: new FormControl('',[Validators.required]),
    EmployeeId : new FormControl (0,[Validators.required])
  })

  ngOnInit(): void {
    this.dataService.getEmployeeRole(+this.route.snapshot.params['id']).subscribe(result => {
      this.editEmployeeRole = result as Employee_Role;
       
      this.updateEmployeeRoleForm.controls['Name'].setValue('');
      this.updateEmployeeRoleForm.controls['Description'].setValue('');
      this.updateEmployeeRoleForm.controls['EmployeeId'].setValue(this.editEmployeeRole.EmployeeId);
  })
  }

  cancel(){
    this.router.navigate(['/employeerole'])
  }

  onSubmit(){
    let employeerole = new Employee_Role();
    employeerole.Name = this.updateEmployeeRoleForm.value.Name;
    employeerole.Description = this.updateEmployeeRoleForm.value.Description;
    employeerole.EmployeeId = this.updateEmployeeRoleForm.value.EmployeeId;

    this.dataService.editEmployeeRole(this.editEmployeeRole.Employee_RoleId,employeerole).subscribe((result:any) =>{
      if(result.statusCode == 200){
        this.router.navigate(['/employeerole'])
      }
      else{
        alert(result.message);
      }
    });
  }

}
