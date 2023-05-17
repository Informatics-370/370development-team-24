import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { ViewEmployeesComponent } from '../view-employees/view-employees.component';
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

  getEmployee(EmployeeId: number) {
    return this.httpClient.get(`${this.apiUrl}Employee/GetEmployee` + "/" + EmployeeId)
    .pipe(map(result => result))
  }

  getAllEmployees(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Employee/GetAllEmployees`)
    .pipe(map(result => result))
  }

  AddEmployee(employee: ViewEmployeesComponent)
  {
    return this.httpClient.post(`${this.apiUrl}Employee/AddEmpoyee`, employee, this.httpOptions)
  }

  DeleteEmployee(EmployeeId: Number)
  {
    return this.httpClient.delete<string>(`${this.apiUrl}Employee/DeleteEmployee` + "/" + EmployeeId, this.httpOptions)
  }

  EditEmployee(EmployeeId: number, employee: Employee)
  {
    return this.httpClient.put(`${this.apiUrl}Employee/EditEmployee/${EmployeeId}`,employee, this.httpOptions)
  }

}