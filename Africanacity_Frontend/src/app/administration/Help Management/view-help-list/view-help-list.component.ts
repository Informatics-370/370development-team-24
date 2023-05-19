import { Component, EventEmitter, Output } from '@angular/core';
import { Help } from '../../Employees/shared/help';
import { Router } from '@angular/router';
import { EmployeeService } from '../../Employees/services/employee.service';

@Component({
  selector: 'app-view-help-list',
  templateUrl: './view-help-list.component.html',
  styleUrls: ['./view-help-list.component.css']
})
export class ViewHelpListComponent {

  help:Help[] = []

  constructor(private employeeservice: EmployeeService, private router: Router){}
  
  ngOnInit(): void{
    this.getAllHelp()
  }

  getAllHelp()
  {
    this.employeeservice.getAllHelp().subscribe(result => {
      let helpList:any[] = result
      helpList.forEach((element) => {
        this.help.push(element)
      });
    })
  }

  DeleteHelp(HelpId: Number){
    this.employeeservice.deleteHelp(HelpId).subscribe(result => {
      window.location.reload();
      });
    }

    searchTerm: string = '';

    @Output() searchClicked: EventEmitter<string> = new EventEmitter<string>();

    search(searchTerm: string) {
      this.searchClicked.emit(searchTerm);
    }

}
