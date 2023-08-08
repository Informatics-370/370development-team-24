import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Employee_Role } from 'src/app/shared/EmployeeRole';
import { Employee } from 'src/app/shared/employee';
import { EmployeeService } from 'src/app/service/employee.service';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  selectedEmployeeRole: Employee_Role | null = null;
  employeeTypesData: Employee_Role[] = [];
  editEmployee: Employee = new Employee();

  updateEmployeeForm: FormGroup = new FormGroup({
    surname: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    employeeRole: new FormControl('', [Validators.required]),
    email_Address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    physical_Address: new FormControl('', [Validators.required])
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
    });

    this.GetAllEmployeeRoles(); // Call this method to populate the supplierTypesData array
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

  updateEmployee() {
    let employee = new Employee();
    employee.surname= this.updateEmployeeForm.value.surname;
    employee.firstName= this.updateEmployeeForm.value.firstName;
    employee.employeeRole = this.updateEmployeeForm.value.employeeRole; 
    employee.email_Address = this.updateEmployeeForm.value.email_Address;
    employee.phoneNumber = this.updateEmployeeForm.value.phoneNumber;
    employee.physical_Address = this.updateEmployeeForm.value.physical_Address;

    this.employeeservice.EditEmployee(this.editEmployee.employeeId, employee).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.router.navigate(['/view-employees']);
          window.location.reload();
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
}



