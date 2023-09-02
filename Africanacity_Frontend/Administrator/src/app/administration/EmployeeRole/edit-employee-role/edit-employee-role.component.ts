import { Component,OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.Service';
import { Employee_Role } from 'src/app/shared/EmployeeRole';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HelpEditemployeeroleComponent } from './help-editemployeerole/help-editemployeerole.component';

@Component({
  selector: 'app-edit-employee-role',
  templateUrl: './edit-employee-role.component.html',
  styleUrls: ['./edit-employee-role.component.css']
})
export class EditEmployeeRoleComponent implements OnInit{

 
constructor(private dataService: DataService, 
  private router: Router, 
  private activated:ActivatedRoute,
  private dialog: MatDialog,) { }

  editEmployeeRole: Employee_Role = new Employee_Role();

  updateEmployeeRoleForm: FormGroup = new FormGroup({
     name: new FormControl('',[Validators.required,this.noSpacesValidator]),
     description: new FormControl('',[Validators.required,this.noSpacesValidator])
  })

  ngOnInit(): void {
    this.activated.params.subscribe(params =>{
    this.dataService.GetEmployeeRole(params['id']).subscribe(result =>{
      this.editEmployeeRole = result as Employee_Role;
      this.updateEmployeeRoleForm.controls['name'].setValue(this.editEmployeeRole.name);
      this.updateEmployeeRoleForm.controls['description'].setValue(this.editEmployeeRole.description);
    })
    })

  }

  cancel(){
    this.router.navigate(['/employee-role'])
  }

  onSubmit(){
    let employeeRole = new Employee_Role();
    employeeRole.name = this.updateEmployeeRoleForm.value.name;
    employeeRole.description = this.updateEmployeeRoleForm.value.description;

    this.dataService.EditEmployeeRole(this.editEmployeeRole.employee_RoleId,employeeRole).subscribe((result:any) => {

    this.router.navigate(['employee-role'])
    });
  }

  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(HelpEditemployeeroleComponent, {
      width: '500px',
      data: { field } // Pass the field name to the modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle modal close if needed
    });
  }

   // Custom validator to check for spaces
   noSpacesValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && control.value.trim().length === 0) {
      return { 'noSpaces': true };
    }
    return null;
  }

}
