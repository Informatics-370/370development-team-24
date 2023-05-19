import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../shared/employee';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent {
  constructor(private employeeservice:EmployeeService, private router : Router , private activated:ActivatedRoute) { }

  editEmployee: Employee = new Employee();

  updateEmployeeForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    duration: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required])
  })

  ngOnInit(): void {

    this.activated.params.subscribe(params => { 
      this.employeeservice.getEmployee(params['Id']).subscribe(res => { 
      this.editEmployee = res as Employee;

      this.updateEmployeeForm.controls['surname'].setValue(this.editEmployee.surname);
      this.updateEmployeeForm.controls['firstname'].setValue(this.editEmployee.firstName);
      this.updateEmployeeForm.controls['email_Address'].setValue(this.editEmployee.email_Address);
      this.updateEmployeeForm.controls['physical_Address'].setValue(this.editEmployee.phoneNumber);
      this.updateEmployeeForm.controls['phoneNumber'].setValue(this.editEmployee.phoneNumber);
      })
 
     })
  }

  cancel(){
    this.router.navigate(['/view-employees'])
  }


  updateEmployee()
  {
    let employee = new Employee();
    employee.surname = this.updateEmployeeForm.value.surname;
    employee.firstName = this.updateEmployeeForm.value.firstName;
    employee.email_Address = this.updateEmployeeForm.value.email_Address;
    employee.physical_Address = this.updateEmployeeForm.value.physical_Address;
    employee.phoneNumber = this.updateEmployeeForm.value.phoneNumber;


   this.employeeservice.editEmployee(this.editEmployee.employeeId,employee).subscribe((response:any) => {

    if(response.statusCode == 200)
    {
      this.router.navigate(['view-employees'])
    }
    else
    {
      alert(response.message);
    }
   });

  }
}



