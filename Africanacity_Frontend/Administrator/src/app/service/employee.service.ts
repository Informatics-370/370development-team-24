import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { ViewEmployeesComponent } from '../administration/Employees/view-employees/view-employees.component';
import { Help } from '../shared/help';
import { Employee } from '../shared/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = 'http://localhost:49991/api/'
  // private apiURL = 'http://localhost:49991/api/Employee';
  // private apiUrl = 'http://localhost:5000/api/email';


  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { 
  }
  checkEmail(email: string) {
    return this.httpClient.post<any>(`${this.apiUrl}`, { email });
  }
  
  //  searchFunctions(searchTerm: string): Observable<Employee[]> {
  //    return this.httpClient.get<Employee[]>(`${this.apiUrl}Employee/search=${searchTerm}`);}
  searchFunctions(searchTerm: string){
    return this.httpClient.get<Employee[]>(`${this.apiUrl}Employee/search`+ "/" + searchTerm)
    .pipe(map(result => result))
  }

  


/* For Employee Function */
  getEmployee(employeeId: number) {
    return this.httpClient.get(`${this.apiUrl}Employee/GetEmployee` + "/" + employeeId)
    .pipe(map(result => result))
  }

  GetAllEmployees(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Employee/GetAllEmployees`)
    .pipe(map(result => result))
  }


  AddEmployee(employee: Employee)
  {
     return this.httpClient.post(`${this.apiUrl}Employee/AddEmployee`, employee, this.httpOptions)
  }


  deleteEmployee(employeeId: Number)
  {
    return this.httpClient.delete<string>(`${this.apiUrl}Employee/DeleteEmployee` + "/" + employeeId, this.httpOptions)
  }

 
  EditEmployee(employeeId: number, employee: Employee): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.put(`${this.apiUrl}Employee/EditEmployee/${employeeId}`, employee, httpOptions);
  }
 
  GetAllGenders(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Employee/GetAllGenders`)
    .pipe(map(result => result))
  }
   
  /* For Help Function */

  
  getHelp(helpId: Number) {
    return this.httpClient.get(`${this.apiUrl}Controller/GetHelp` + "/" + helpId)
    .pipe(map(result => result))
  }

  GetAllHelp(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Controller/GetAllHelp`)
    .pipe(map(result => result))
  }

  AddHelp(help: Help)
  {
    return this.httpClient.post(`${this.apiUrl}Controller/AddHelp`, help, this.httpOptions)
  }

  deleteHelp(helpId: Number)
  {
    return this.httpClient.delete<string>(`${this.apiUrl}Controller/DeleteHelp` + "/" + helpId, this.httpOptions)
  }

  editHelp(helpId: Number, help: Help)
  {
    return this.httpClient.put(`${this.apiUrl}Controller/EditHelp/${helpId}`,help, this.httpOptions)
  }

  GetAllEmployeeRoles(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}EmployeeRole/GetAllEmployeeRoles`)
    .pipe(map(results => results))
    
  }

}