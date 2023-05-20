import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../service/employee.service';
import { Employee } from '../../../shared/employee';
import { EmailService } from 'src/app/service/email.service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  

   constructor(private employeeservice: EmployeeService, emailservice: EmailService,  private router: Router) { }

     employeeForm: FormGroup = new FormGroup({
       surname: new FormControl('',[Validators.required]),
       firstName: new FormControl('',[Validators.required]),
       email_Address: new FormControl('',[Validators.required]),
       physical_Address: new FormControl('',[Validators.required]),
       phoneNumber: new FormControl('',[Validators.required])
    
     })

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
    
     this.employeeservice.AddEmployee(employee).subscribe((res:any) => {

      if(res.statusCode == 200)
      {
        this.router.navigate(['/'])
      }
      else
      {
        alert(res.message);
      }
     });
         }
}
