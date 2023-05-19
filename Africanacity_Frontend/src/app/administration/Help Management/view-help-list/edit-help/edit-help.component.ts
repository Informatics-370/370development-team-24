import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/administration/Employees/services/employee.service';
import { Help } from 'src/app/administration/Employees/shared/help';

@Component({
  selector: 'app-edit-help',
  templateUrl: './edit-help.component.html',
  styleUrls: ['./edit-help.component.css']
})
export class EditHelpComponent {

  // helpForm = new FormGroup(
  //   {
  //       Name: new FormControl(''),
  //       Description: new FormControl(''),
  //   })

  // help:any
  // data: any;
  // activated: any;
  // constructor(private employeeservice: EmployeeService, private router: Router, private route:ActivatedRoute) { }

  // ngOnInit(): void {
  //    this.employeeservice.getEmployee(+this.route.snapshot.params['Id']).subscribe(result => {
  //      this.help = result
  //      this.helpForm.patchValue({
  //        Name: this.help.Name,
  //        Description: this.help.Description
  //      });
  //  })
  // }

  // OnUpdate()
  // {
  //   let help = new Help();
  //   help.name = this.helpForm.value.Name!;
  //   help.firstName = this.helpForm.value.FirstName!;
  

  //  this.data.editEmployee(this.employee.employeeId,employee).subscribe((response:any) => {

  //   if(response.statusCode == 200)
  //   {
  //     this.router.navigate(['view-employees'])
  //   }
  //   else
  //   {
  //     alert(response.message);
  //   }
  //  });

  // }
  // 
}