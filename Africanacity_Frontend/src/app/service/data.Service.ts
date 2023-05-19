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

  apiUrl = 'https://localhost:7258/swagger/index.html'

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
  getEmployeeRole(Employee_RoleId: number) {
    return this.httpClient.get(`${this.apiUrl}EmployeeRole/GetEmployeeRole` + "/" + Employee_RoleId)
    .pipe(map(result => result))
  }

  getEmployeeRoles(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}EmployeeRole/GetAllEmployeeRoles`)
    .pipe(map(result => result))
  }

  addEmployeeRole(EmployeeRole: Employee_Role)
  {
    return this.httpClient.post(`${this.apiUrl}EmployeeRole/AddEmployeeRole`, EmployeeRole, this.httpOptions)
  }

  deleteEmployeeRole(Employee_RoleId: Number)
  {
    return this.httpClient.delete<string>(`${this.apiUrl}EmployeeRole/DeleteEmployeeRole` + "/" + Employee_RoleId, this.httpOptions)
  }

  editEmployeeRole(Employee_RoleId: number, EmployeeRole: Employee_Role)
  {
    return this.httpClient.put(`${this.apiUrl}EmployeeRole/EditEmployeeRole/${Employee_RoleId}`,EmployeeRole, this.httpOptions)
  }

}
