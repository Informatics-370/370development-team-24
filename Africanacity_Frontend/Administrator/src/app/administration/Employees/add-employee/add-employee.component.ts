import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
function GetAllEmployeeRoles() {
  throw new Error('Function not implemented.');
}

