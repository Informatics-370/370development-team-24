import { Component } from '@angular/core';
import { EmployeeService } from '../../../../service/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../../../shared/employee';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Employee_Role } from 'src/app/shared/EmployeeRole';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent {
  selectedEmployeeRole: Employee_Role | null = null;
  employeeRolesData: Employee_Role[] = [];
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
        const selectedType = this.employeeRolesData.find(type => type.name === this.editEmployee.employeeRoleName);
        if (selectedType) {
          this.updateEmployeeForm.controls['employeeRole'].patchValue(selectedType.employee_RoleId);
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
      let employeeRoleList: any[] = result;
      employeeRoleList.forEach((element) => {
        this.employeeRolesData.push(element);
      });
    });
  }

  updateEmployee() {
    let employee = new Employee();
    employee.surname = this.updateEmployeeForm.value.supplierName;
    employee.firstName = this.updateEmployeeForm.value.supplierName;
    employee.employeeRole = this.updateEmployeeForm.value.employeeRole; // Assign the selected employee Role ID
    employee.email_Address = this.updateEmployeeForm.value.email_Address;
    employee.phoneNumber = this.updateEmployeeForm.value.phoneNumber;
    employee.physical_Address = this.updateEmployeeForm.value.physical_Address;

    this.employeeservice.EditEmployee(this.editEmployee.employeeId, employee).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.router.navigate(['./view-employees']);
          window.location.reload();
          this.showSuccessMessage('Employee Information updated successfully!');
        } else {
          // Handle error if needed
        }
      },
      (error) => {
        // Handle error if needed
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



