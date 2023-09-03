import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Employee_Role } from 'src/app/shared/EmployeeRole';
import { Employee } from 'src/app/shared/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { Gender } from 'src/app/shared/gender';
import { HelpEditemployeeComponent } from './help-editemployee/help-editemployee.component';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  selectedEmployeeRole: Employee_Role | null = null;
  employeeTypesData: Employee_Role[] = [];
  editEmployee: Employee = new Employee();
  genderData: Gender[] = [];

  updateEmployeeForm: FormGroup = new FormGroup({
    surname: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    employeeRole: new FormControl('', [Validators.required]),
    email_Address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    physical_Address: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    
  });

  constructor(
    private employeeservice: EmployeeService,
    private router: Router,
    private activated: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.activated.params.subscribe(params => {
      this.employeeservice.getEmployee(params['id']).subscribe(res => {
        this.editEmployee = res as Employee;

        this.updateEmployeeForm.controls['surname'].setValue(this.editEmployee.surname);
        this.updateEmployeeForm.controls['firstName'].setValue(this.editEmployee.firstName);
        this.updateEmployeeForm.controls['email_Address'].setValue(this.editEmployee.email_Address);
        this.updateEmployeeForm.controls['phoneNumber'].setValue(this.editEmployee.phoneNumber);
        this.updateEmployeeForm.controls['physical_Address'].setValue(this.editEmployee.physical_Address);

        // Find the selected Supplier Type in the supplierTypesData array
        const selectedType = this.employeeTypesData.find(type => type.name === this.editEmployee.employeeRoleName);
        if (selectedType) {
          this.updateEmployeeForm.controls['employeeRole'].setValue(selectedType.employee_RoleId);
        }
      });
      const selectedType = this.genderData.find(type => type.name === this.editEmployee.genderName);
      if (selectedType) {
        this.updateEmployeeForm.controls['gender'].setValue(selectedType.genderId);
      }
    });
    

    this.GetAllEmployeeRoles();
    this.GetAllGenders();
    console.log(this.editEmployee) // Call this method to populate the supplierTypesData array
  }

  cancel() {
    this.router.navigate(['/view-employees']);
  }

  GetAllEmployeeRoles() {
    this.employeeservice.GetAllEmployeeRoles().subscribe(result => {
      let employeeTypeList: any[] = result;
      employeeTypeList.forEach((element) => {
        this.employeeTypesData.push(element);
      });
    });
  }
  GetAllGenders() {
    this.employeeservice.GetAllGenders().subscribe(result => {
      let genderList: any[] = result;
      genderList.forEach((element) => {
        this.genderData.push(element);
      });
    });
  }

  updateEmployee() {
    let employee = new Employee();
    employee.surname= this.updateEmployeeForm.value.surname;
    employee.firstName= this.updateEmployeeForm.value.firstName;
    employee.employeeRole = this.updateEmployeeForm.value.employeeRole; 
    employee.email_Address = this.updateEmployeeForm.value.email_Address;
    employee.phoneNumber = this.updateEmployeeForm.value.phoneNumber;
    employee.physical_Address = this.updateEmployeeForm.value.physical_Address;
    employee.gender = this.updateEmployeeForm.value.gender;

    this.employeeservice.EditEmployee(this.editEmployee.employeeId, employee).subscribe(
      (response: any) => {
        if (response) {
          this.router.navigate(['/view-employees']);
         
          this.showSuccessMessage( employee.firstName + 'Information updated successfully!');
        } else {
          this.showSuccessMessage( employee.firstName + 'Information cannot be updated!');
        }
      },
      
      (error) => {
        this.showSuccessMessage( employee.firstName +'s' +'' + 'Information cannot be updated!');
      }
      
    );
   
  }

  showSuccessMessage(message: string): void {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'Ok', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(HelpEditemployeeComponent, {
      width: '500px',
      data: { field } // Pass the field name to the modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle modal close if needed
    });
  }
}



