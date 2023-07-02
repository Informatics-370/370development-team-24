import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../service/employee.service';
import { Employee } from '../../../shared/employee';
import { EmailService } from 'src/app/service/email.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';



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

   constructor(private employeeservice: EmployeeService, emailservice: EmailService,  private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

     employeeForm: FormGroup = new FormGroup({
       surname: new FormControl('',[Validators.required]),
       firstName: new FormControl('',[Validators.required]),
       email_Address: new FormControl('',[Validators.required]),
       physical_Address: new FormControl('',[Validators.required]),
       phoneNumber: new FormControl('',[Validators.required])
    
     })
  //EmailVerification

  // checkEmail() {
  //   this.employeeservice.checkEmail(this.email).subscribe(
  //     (response) => {
  //       this.message = response.message;
  //     },
  //     (error) => {
  //       console.error('Error checking email:', error);
  //     }
  //   );
  // }


     Roles: string[] = ['Driver', 'Administrator', 'Waiter'];

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
    
    }

    cancel(){
      this.router.navigate(['/home'])
    }
  
       onSubmit(){

        let employee = new Employee();
        employee.surname = this.employeeForm.value.surname;
        employee.firstName = this.employeeForm.value.firstName;
        employee.email_Address = this.employeeForm.value.email_Address;
        employee.physical_Address = this.employeeForm.value.physical_Address;
        employee.phoneNumber = this.employeeForm.value.phoneNumber;
            this.employeeservice.AddEmployee(employee).subscribe(result => {
                  this.router.navigate(['/view-employees'])
            })
            // checkEmail() {
            //   this.employeeservice.checkEmail(this.email).subscribe(
            //     (response) => {
            //       this.message = response.message;
            //     },
            //     (error) => {
            //       console.error('Error checking email:', error);
            //     }
            //   );
            // }
          
    
     this.employeeservice.AddEmployee(employee).subscribe((res:any) => {

      if(res.statusCode == 200)
      {
        this.router.navigate(['/'])
      }
      else
      {
      
      }
     });
     this.showSuccessMessage('Employee added successfully!');
         }

         showSuccessMessage(message: string): void {
          const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'Ok', {
            duration: 3000, // Duration in milliseconds
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        
            snackBarRef.afterDismissed().subscribe(() => {
            this.toastContainer.clear();
          });
}
}
