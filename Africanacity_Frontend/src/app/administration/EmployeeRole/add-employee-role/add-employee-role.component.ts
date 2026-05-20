import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.Service';
import { Employee_Role } from 'src/app/shared/EmployeeRole';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-employee-role',
  templateUrl: './add-employee-role.component.html',
  styleUrls: ['./add-employee-role.component.css']
})
export class AddEmployeeRoleComponent implements OnInit {


  
    constructor(private dataService: DataService, private router: Router, 
      private activated: ActivatedRoute,
      private snackBar: MatSnackBar) {}

     employeeroleForm: FormGroup = new FormGroup({
      name: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required])
     })
  
    ngOnInit(): void {
    }
  
    cancel(){
      this.router.navigate(['/employee-role'])
    }
  
    onSubmit(){

      let employeeRole = new Employee_Role();
      employeeRole.name = this.employeeroleForm.value.name;
      employeeRole.description = this.employeeroleForm.value.description;
     
       this.dataService.AddEmployeeRole(employeeRole).subscribe(result => {
        this.router.navigate(['/employee-role'])
       });

       this.showSuccessMessage('Employee Role Added successfully');

    }
    // Success notification
    showSuccessMessage(message:string) : void {
      const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'Ok', {
        duration: 3000, // Duration in milliseconds
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
}
