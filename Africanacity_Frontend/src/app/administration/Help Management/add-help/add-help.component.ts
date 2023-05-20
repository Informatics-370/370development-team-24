import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../service/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Help } from '../../../shared/help';

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
         this.employeeservice.AddHelp(help).subscribe(result => {
               this.router.navigate(['/view-help-list'])
         })
 
  this.employeeservice.AddHelp(help).subscribe((res:any) => {

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
