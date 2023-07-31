import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'
import { TokenApiModel } from '../models/token-api.model';
import { Observable } from 'rxjs';
import { ResetPassword } from '../models/reset-password.model';
import { UpdatePassword } from '../models/Update';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://localhost:49991/api/User/';
  private userPayload:any;
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
   }

   ChangePassword(request: UpdatePassword) {
    return this.http.post<any>(`${this.baseUrl}Changepassword`, request);
  }
  
  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}Register`, userObj)
  }

  signIn(loginObj : any){
    return this.http.post<any>(`${this.baseUrl}Authenticate`,loginObj)
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }
  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }
  
  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  //Username
  getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.name;
    }

    //Firstname
    getNameFromToken(){
      if(this.userPayload)
      return this.userPayload.given_name;
    }

    //Latsname
   getLastNameFromToken(){
    if(this.userPayload)
    return this.userPayload.family_name;
  }

    //PhoneNumber
    getPhoneFromToken(){
      if(this.userPayload)
      return this.userPayload.winaccountname;
    }

   //Address
  getAddressFromToken(){
    if(this.userPayload)
    return this.userPayload.actort;
    }

     //Email
    getEmailFromToken(){
      if(this.userPayload)
      return this.userPayload.email;
    }

    //Role
  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

      //UserId
  getUserIdFromToken(){
    if(this.userPayload)
    return this.userPayload.nameid;
  }

  renewToken(tokenApi : TokenApiModel){
    return this.http.post<any>(`${this.baseUrl}Refresh`, tokenApi)
  }

  // getUserIdFromToken(): string {
  //   if (this.userPayload) {
  //     // Assuming 'userId' is the key containing the user ID in the decoded token
  //     return this.userPayload.UserId;
  //   }
  //   return ''; // Return an appropriate default value or handle the case when there's no user ID.
  // }


}
