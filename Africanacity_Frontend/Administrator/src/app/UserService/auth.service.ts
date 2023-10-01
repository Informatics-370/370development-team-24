import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'
import { TokenApiModel } from '../shared/token-api.model';
import { Observable } from 'rxjs';
import { UpdatePassword } from '../shared/UpdatePassword';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'https://localhost:49991/api/Authentication/';
  private userPayload:any;
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
   }
   
   changePassword(request: UpdatePassword) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}` // Replace with your token retrieval method
    });
  
    return this.http.post<any>(`${this.baseUrl}ChangePassword`, request, { headers });
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

}
