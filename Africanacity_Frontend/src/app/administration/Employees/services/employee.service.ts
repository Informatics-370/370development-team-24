import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { ViewEmployeesComponent } from '../view-employees/view-employees.component';
import { Help } from '../shared/help';
import { Employee } from '../shared/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = 'http://localhost:49991/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { 
  }


/* For Employee Function */
  getEmployee(employeeId: number) {
    return this.httpClient.get(`${this.apiUrl}Employee/GetEmployee` + "/" + employeeId)
    .pipe(map(result => result))
  }

  getAllEmployees(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Employee/GetAllEmployees`)
    .pipe(map(result => result))
  }

    // AddEmployee(employee: Employee)
    // {
    //   return this.httpClient.post(this.apiUrl + `Employee/AddEmpoyee`, employee)
    // }

  AddEmployee(employee: Employee)
  {
     return this.httpClient.post(`${this.apiUrl}Employee/AddEmployee`, employee, this.httpOptions)
  }


  deleteEmployee(employeeId: Number)
  {
    return this.httpClient.delete<string>(`${this.apiUrl}Employee/DeleteEmployee` + "/" + employeeId, this.httpOptions)
  }

  editEmployee(employeeId: number, employee: Employee)
  {
    return this.httpClient.put(`${this.apiUrl}Employee/EditEmployee/${employeeId}`,employee, this.httpOptions)
  }

  /* For Help Function */

  
  getHelp(HelpId: number) {
    return this.httpClient.get(`${this.apiUrl}Help/GetHelp` + "/" + HelpId)
    .pipe(map(result => result))
  }

  getAllHelp(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Help/GetAllHelp`)
    .pipe(map(result => result))
  }

  addHelp(help: Help)
  {
    return this.httpClient.post(`${this.apiUrl}Help/AddHelp`, help, this.httpOptions)
  }

  deleteHelp(HelpId: Number)
  {
    return this.httpClient.delete<string>(`${this.apiUrl}Help/DeleteHelp` + "/" + HelpId, this.httpOptions)
  }

  editHelp(HelpId: Number, help: Help)
  {
    return this.httpClient.put(`${this.apiUrl}Help/EditHelp/${HelpId}`,help, this.httpOptions)
  }

}