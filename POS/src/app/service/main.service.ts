import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Login } from '../shared/login';
import { Register } from '../shared/register';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  //linking to backend
  apiUrl = 'https://localhost:49991/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  //register user 
  RegisterUser(registerUser: Login){
    return this.httpClient.post(`${this.apiUrl}Authentication/Register`, registerUser, this.httpOptions)
  }


  //login user
  LoginUser(loginUser: Login){
    let user = new UserCredentials
    return this.httpClient.post<User>(`${this.apiUrl}Authentication/Login`, loginUser, this.httpOptions)
  }





}

//user credentials class
class UserCredentials{
  EmailAddress:string = 'Addyouremailaddresshere';
  Password:string = 'Addyourpasswordhere'
}
