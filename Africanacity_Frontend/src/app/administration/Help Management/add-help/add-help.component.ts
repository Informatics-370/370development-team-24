import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../Employees/services/employee.service';
import { Router } from '@angular/router';
import { Help } from '../../Employees/shared/help';
@Component({
  selector: 'app-add-help',
  templateUrl: './add-help.component.html',
  styleUrls: ['./add-help.component.css']
})
export class AddHelpComponent {
  constructor(private employeeservice: EmployeeService, private router: Router) { }

  helpForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    
 
  })

 ngOnInit(): void {
 
 }

 cancel(){
   this.router.navigate(['/home'])
 }

    onSubmit(){

     let help = new Help();
     help.name = this.helpForm.value.name;
     help.description = this.helpForm.value.description;
         this.employeeservice.addHelp(help).subscribe(result => {
               this.router.navigate(['/view-help-list'])
         })
 
  this.employeeservice.addHelp(help).subscribe((res:any) => {

   if(res.statusCode == 200)
   {
     this.router.navigate(['view-help-list'])
   }
   else
   {
     alert(res.message);
   }
  });
      }

}
