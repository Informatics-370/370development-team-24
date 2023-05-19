import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.Service';
import { Employee_Role } from 'src/app/shared/EmployeeRole';

@Component({
  selector: 'app-add-employee-role',
  templateUrl: './add-employee-role.component.html',
  styleUrls: ['./add-employee-role.component.css']
})
export class AddEmployeeRoleComponent implements OnInit {

  employeeroleForm = new FormGroup(
    {
        
        Name: new FormControl(''),
        Description: new FormControl(''),
        EmployeeId: new FormControl(0)
    })
  
    constructor(private dataService: DataService, private router: Router) { }
  
    ngOnInit(): void {
    }
  
    cancel(){
      this.router.navigate(['/employeerole'])
    }
  
    onSubmit(){
      this.dataService.addEmployeeRole(this.employeeroleForm.value).subscribe(result => {
            this.router.navigate(['/employeerole'])
      })
    }
}
