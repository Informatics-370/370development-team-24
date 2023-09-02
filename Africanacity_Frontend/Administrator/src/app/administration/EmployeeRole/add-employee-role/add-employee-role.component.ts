import { Component,OnInit } from '@angular/core';
import { AbstractControl,FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.Service';
import { Employee_Role } from 'src/app/shared/EmployeeRole';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HelpAddemployeeroleComponent } from './help-addemployeerole/help-addemployeerole.component';

@Component({
  selector: 'app-add-employee-role',
  templateUrl: './add-employee-role.component.html',
  styleUrls: ['./add-employee-role.component.css']
})
export class AddEmployeeRoleComponent implements OnInit {


  
    constructor(private dataService: DataService, private router: Router, 
      private activated: ActivatedRoute,
      private snackBar: MatSnackBar, private dialog: MatDialog,) {}

     employeeroleForm: FormGroup = new FormGroup({
      name: new FormControl('',[Validators.required,this.noSpacesValidator]),
      description: new FormControl('',[Validators.required,this.noSpacesValidator])
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

    openHelpModal(field: string): void {
      const dialogRef = this.dialog.open(HelpAddemployeeroleComponent, {
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
