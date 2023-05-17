import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';



@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  AddEmployeeForm = new FormGroup({
    
  }

  )


  constructor(private employeeservice: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    
  }

  cancel(){
    this.router.navigate(['/home'])
  }

  // onSubmit(){
  //   this.employeeservice.AddEmployee(this.AddEmployeeForm.value).subscribe(result => {
  //         this.router.navigate(['/add-employee'])
  //   })
  // }

  

}
