import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.Service';
import { Employee_Role } from 'src/app/shared/EmployeeRole';

@Component({
  selector: 'app-add-employee-role',
  templateUrl: './add-employee-role.component.html',
  styleUrls: ['./add-employee-role.component.css']
})
export class AddEmployeeRoleComponent implements OnInit {

  employeeroleForm:FormGroup = new FormGroup(
    {
        
        Name: new FormControl('',[Validators.required]),
        Description: new FormControl('',[Validators.required]),
        EmployeeId: new FormControl(0,[Validators.required])
   })
  
    constructor(private dataService: DataService, private router: Router) {
     }
  
    ngOnInit(): void {
    }
  
    cancel(){
      this.router.navigate(['/employeerole'])
    }
  
    onSubmit(){
      //this.dataService.addEmployeeRole(this.employeeroleForm.value).subscribe(result => {
            //this.router.navigate(['/employeerole'])
      //})
      let employeerole = new Employee_Role();
      employeerole.Name = this.employeeroleForm.value.Name;
      employeerole.Description = this.employeeroleForm.value.Description;
      employeerole.EmployeeId = this.employeeroleForm.value.EmployeeId;
       this.dataService.addEmployeeRole(employeerole).subscribe(result => {
        this.router.navigate(['/employeerole'])
       })

    }
}
