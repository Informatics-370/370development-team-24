import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/service/employee.service';
import { Help } from 'src/app/shared/help';

@Component({
  selector: 'app-edit-help',
  templateUrl: './edit-help.component.html',
  styleUrls: ['./edit-help.component.css']
})
export class EditHelpComponent {
  constructor(
    private employeeservice:EmployeeService, 
    private router : Router , 
    private activated:ActivatedRoute) { }

  editHelp: Help = new Help();

  helpForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
  })
  

  ngOnInit(): void {

    this.activated.params.subscribe(params => { 
      this.employeeservice.getHelp(params['id']).subscribe(res => { 
      this.editHelp = res as Help;

      this.helpForm.controls['name'].setValue(this.editHelp.name);
      this.helpForm.controls['description'].setValue(this.editHelp.description);
     
      })
 
     })
  }

  cancel(){
    this.router.navigate(['/view-help-list'])
  }

  updateHelp()
  {
    let help = new Help();
    help.name = this.helpForm.value.name;
    help.description = this.helpForm.value.description;
   this.employeeservice.editHelp(this.editHelp.helpId,help).subscribe((response:any) => {

    if(response.statusCode == 200)
    {
      this.router.navigate(['/view-help-list'])
    }
    else
    {
      alert(response.message);
    }
   });

  }
}