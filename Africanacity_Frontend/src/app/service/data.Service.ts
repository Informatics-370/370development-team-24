import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginUser } from '../shared/login-user';
import { RegisterUser } from '../shared/register-user';
import { User } from '../shared/user';
import { MenuTypes } from '../shared/menu-types'; //Menu Types

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'http://localhost:49991/api/'

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

  /***************Menu Types************/

  //Create
  AddMenuType(menuType: MenuTypes){
    return this.httpClient.post(`${this.apiUrl}MenuType/AddMenuType`,menuType);
  }

  GetAllMenuTypes(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}MenuType/GetAllMenuTypes`)
    .pipe(map(result => result));
  }



}
