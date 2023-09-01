import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../service/employee.service';
import { DataService } from 'src/app/service/data.Service';
import { Employee } from '../../../shared/employee';
import { Employee_Role } from 'src/app/shared/EmployeeRole';
import { EmailService } from 'src/app/service/email.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Gender } from 'src/app/shared/gender';
import { AbstractControl } from '@angular/forms';
import { HelpAddemployeesComponent } from './help-addemployees/help-addemployees.component';

function phoneNumberValidator(control: AbstractControl): { [key: string]: any } | null {
  const phoneNumber = control.value;
  const digitsOnly = phoneNumber.replace(/\D/g, '');

  if (digitsOnly.length !== 10 || !phoneNumber.startsWith('0')) {
    return { 'invalidPhoneNumber': true };
  }

  return null;
}


function emailFormatValidator(control: AbstractControl): { [key: string]: any } | null {
  const email = control.value;
  const emailPattern = /^[a-zA-Z0-9]+@gmail\.com$/;

  if (!emailPattern.test(email)) {
    return { 'invalidEmailFormat': true };
  }

  return null;
}

// function noWhitespaceValidator(): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: boolean } | null => {
//     if (control.value && /^\s+$/.test(control.value)) {
//       return { 'whitespace': true };
//     }
//     return null;
//   };
// }



@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
//   template: `
//   <input type="text" [(ngModel)]="email" name="email" placeholder="Email" required>
//   <button (click)="checkEmail()">Check Email</button>

//   <div *ngIf="message" class="message">
//     {{ message }}
//   </div>
// `,
styles: [`
.message {
  padding: 10px;
  background-color: lightgray;
  margin-top: 10px;
}
`]

})
export class AddEmployeeComponent implements OnInit {
  @ViewChild('toastContainer', { read: ViewContainerRef })
  toastContainer!: ViewContainerRef;
  email!: string;
  message!: string;
  employeeRole: Employee_Role[] = [];
  gender: Gender[] = [];

   constructor(private employeeservice: EmployeeService, private dataService: DataService, emailservice: EmailService,  private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

     employeeForm: FormGroup = new FormGroup({
       surname: new FormControl('', [Validators.required]),
       firstName: new FormControl('',[Validators.required]),
       email_Address: new FormControl('', [Validators.required, emailFormatValidator]),
       physical_Address: new FormControl('',[Validators.required]),
       phoneNumber: new FormControl('', [Validators.required, phoneNumberValidator]),
       employeeRole: new FormControl('',[Validators.required]),
       gender: new FormControl('',[Validators.required]),
       employment_Date: new FormControl([new Date().toISOString().slice(0, 10)])
    
     })
  //EmailVerification

  checkEmail() {
    this.employeeservice.checkEmail(this.email).subscribe(
      (response) => {
        this.message = response.message;
      },
      (error) => {
        console.error('Error checking email:', error);
      }
    );
  }

  // Display Notifcations

  openDialog():void{
    const dialogRef = this.dialog.open(NotificationDialogComponent,{
      width: '250px',
      data: 'Add new Employee?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'Yes'){
        this.onSubmit();
      }
    })
  }
    

  ngOnInit(): void {
    this.GetAllEmployeeRoles()
    this.GetAllGenders()
  }

  cancel(){
    this.router.navigate(['/home'])
  }

  GetAllEmployeeRoles()
  {
    this.dataService.GetAllEmployeeRoles().subscribe(result => {
      let rolesList:any[] = result
      rolesList.forEach((element) => {
        this.employeeRole.push(element)
      });
    });
  }
  GetAllGenders()
  {
    this.employeeservice.GetAllGenders().subscribe(result => {
      let genderList:any[] = result
      genderList.forEach((element) => {
        this.gender.push(element)
      });
    });
  }
  isControlInvalid(controlName: string): boolean {
    const control = this.employeeForm.get(controlName);

    if (!control) {
      return false;
    }

    const isInvalid = control.invalid && control.touched;
    const hasOnlyWhitespace = /^\s*$/.test(control.value);

    return isInvalid || hasOnlyWhitespace;
  }
  
  onSubmit() {
    if (this.employeeForm.invalid) {
      this.showErrorMessage('Please fill in all required fields.');
      // Highlight invalid controls
      Object.keys(this.employeeForm.controls).forEach(controlName => {
        if (this.employeeForm.controls[controlName].invalid) {
          this.employeeForm.controls[controlName].markAsTouched();
        }
      });
      return;
    }
    const currentDate = new Date();

    let employee = new Employee();
    employee.surname = this.employeeForm.value.surname;
    employee.firstName = this.employeeForm.value.firstName;
    employee.employeeRole = this.employeeForm.value.employeeRole;
    employee.email_Address = this.employeeForm.value.email_Address;
    employee.physical_Address = this.employeeForm.value.physical_Address;
    employee.phoneNumber = this.employeeForm.value.phoneNumber;
    employee.employment_Date = currentDate as Date; 
    employee.gender = this.employeeForm.value.gender;
  
    this.employeeservice.AddEmployee(employee).subscribe(result => {
      this.router.navigate(['/view-employees'])
 });

    

     this.showSuccessMessage('Successfully added!');
         }

         showSuccessMessage(message: string): void {
          const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'Ok', {
            duration: 5000, // Duration in milliseconds
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        
            snackBarRef.afterDismissed().subscribe(() => {
            this.toastContainer.clear();
          });
  }
  showErrorMessage(message: string): void {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'Ok', {
      duration: 5000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
}
openHelpModal(field: string): void {
  const dialogRef = this.dialog.open(HelpAddemployeesComponent, {
    width: '500px',
    data: { field } // Pass the field name to the modal
  });

  dialogRef.afterClosed().subscribe(result => {
    // Handle modal close if needed
  });
}


}

