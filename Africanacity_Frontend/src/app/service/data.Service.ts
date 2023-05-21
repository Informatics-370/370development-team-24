import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginUser } from '../shared/login-user';
import { RegisterUser } from '../shared/register-user';
import { User } from '../shared/user';
import { Employee_Role} from '../shared/EmployeeRole';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'http://localhost:61433/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {   
  }

  RegisterUser(registerUser: RegisterUser){
    return this.httpClient.post(`${this.apiUrl}Authentication/Register`, registerUser, this.httpOptions)
  }

  LoginUser(loginUser: LoginUser){
    return this.httpClient.post<User>(`${this.apiUrl}Authentication/Login`, loginUser, this.httpOptions)
  }

  ValidateOtp(user: User){
    return this.httpClient.post(`${this.apiUrl}Authentication/Otp`, user, this.httpOptions)
  }

  //Code Related to employee role
  GetEmployeeRole(employee_RoleId: number) {
    return this.httpClient.get(`${this.apiUrl}EmployeeRole/GetEmployeeRole` + "/" + employee_RoleId)
    .pipe(map(result => result))
  }

  GetAllEmployeeRoles(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}EmployeeRole/GetAllEmployeeRoles`)
    .pipe(map(results => results))
    
  }

  AddEmployeeRole(employeeRole: Employee_Role)
  {
    return this.httpClient.post(`${this.apiUrl}EmployeeRole/AddEmployeeRole`, employeeRole, this.httpOptions)
  }

  DeleteEmployeeRole(employee_RoleId: Number)
  {
    return this.httpClient.delete<string>(`${this.apiUrl}EmployeeRole/DeleteEmployeeRole` + "/" + employee_RoleId, this.httpOptions)
  }

  EditEmployeeRole(employee_RoleId: number, employeeRole: Employee_Role)
  {
    return this.httpClient.put(`${this.apiUrl}EmployeeRole/EditEmployeeRole/${employee_RoleId}`,employeeRole, this.httpOptions)
  }

}
