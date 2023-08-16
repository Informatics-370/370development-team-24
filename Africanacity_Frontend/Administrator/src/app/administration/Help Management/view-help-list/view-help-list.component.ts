import { Component, EventEmitter, Output } from '@angular/core';
import { Help } from '../../../shared/help';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../service/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-view-help-list',
  templateUrl: './view-help-list.component.html',
  styleUrls: ['./view-help-list.component.css']
})
export class ViewHelpListComponent {

  helps:Help[] = []

  constructor(private employeeservice: EmployeeService, private router: Router){}
  
  ngOnInit(): void{
    this.GetAllHelp()
  }

  GetAllHelp()
  {
    this.employeeservice.GetAllHelp().subscribe(result => {
      let helpList:any[] = result
      helpList.forEach((element) => {
        this.helps.push(element)
      });
    })
  }

  deleteHelp(helpId: Number){
    this.employeeservice.deleteHelp(helpId).subscribe(result => {
      window.location.reload();
      });
    }


}
