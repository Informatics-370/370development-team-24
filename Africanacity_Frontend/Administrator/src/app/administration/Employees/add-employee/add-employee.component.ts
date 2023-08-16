import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from 'src/app/service/email.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/service/employee.service';
import { Employee } from 'src/app/shared/employee';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
import { Employee_Role } from 'src/app/shared/EmployeeRole';
import { DataService } from 'src/app/service/data.Service';
import { Gender } from 'src/app/shared/gender';



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

  constructor(private employeeservice: EmployeeService, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar, dataService: DataService) { }

     employeeForm: FormGroup = new FormGroup({
       surname: new FormControl('',[Validators.required]),
       firstName: new FormControl('',[Validators.required]),
       email_Address: new FormControl('',[Validators.required]),
       physical_Address: new FormControl('',[Validators.required]),
       phoneNumber: new FormControl('',[Validators.required]),
       employeeRole: new FormControl('',[Validators.required]),
       gender: new FormControl('',[Validators.required]),
       employment_Date: new FormControl('',[Validators.required])
    
     })
  //EmailVerification


  ngOnInit(): void {
    this.GetAllEmployeeRoles()
    this.GetAllGenders()
  }

  cancel(){
    this.router.navigate(['/view-employees'])
  }

  GetAllEmployeeRoles(){
    this.employeeservice.GetAllEmployeeRoles().subscribe(result => {
      let employeeRoleList:any[] = result
      employeeRoleList.forEach((element) => {
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
  
  onSubmit() {
    if (this.employeeForm.invalid) {
      return;
    }
  
    let employee = new Employee();
    employee.surname = this.employeeForm.value.surname;
    employee.firstName = this.employeeForm.value.firstName;
    employee.employeeRole = this.employeeForm.value.employeeRole;
    employee.email_Address = this.employeeForm.value.email_Address;
    employee.physical_Address = this.employeeForm.value.physical_Address;
    employee.phoneNumber = this.employeeForm.value.phoneNumber;
    employee.employment_Date = this.employeeForm.value.employment_Date;
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
}
