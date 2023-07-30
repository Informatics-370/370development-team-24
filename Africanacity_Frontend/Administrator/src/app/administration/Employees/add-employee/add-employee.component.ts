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
  employeeRoleData:Employee_Role[]=[]
  toastContainer: any;

  constructor(private employeeservice: EmployeeService, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar, dataService: DataService) { }

  employeeForm: FormGroup = new FormGroup({
    surname: new FormControl('',[Validators.required]),
    firstName: new FormControl('',[Validators.required]),
    employeeRole: new FormControl([Validators.required]),
    email_Address: new FormControl('',[Validators.required]),
    physical_Address: new FormControl('',[Validators.required]),
    phoneNumber: new FormControl('',[Validators.required])

  })

  ngOnInit(): void {
    this.GetAllEmployeeRoles()
  }

  cancel(){
    this.router.navigate(['/view-employees'])
  }

  GetAllEmployeeRoles(){
    this.employeeservice.GetAllEmployeeRoles().subscribe(result => {
      let employeeRoleList:any[] = result
      employeeRoleList.forEach((element) => {
        this.employeeRoleData.push(element)
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
 
   this.employeeservice.AddEmployee(employee).subscribe(result => {
     this.router.navigate(['/view-employees'])
});
 
   this.snackBar.open(
     this.employeeForm.get('firstName' + 'surname')!.value + ` created successfully`,
     'X',
     { duration: 5000 }
   );
 }
}
