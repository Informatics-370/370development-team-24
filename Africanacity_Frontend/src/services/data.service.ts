import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginUser } from '../shared/login-user';
import { RegisterUser } from '../shared/register-user';
import { User } from '../shared/user';

@Injectable({
    providedIn: 'root'
  })

export class DataService {

    private _email: string = ""
    get email() { return this._email }
    set email(value: string) { this._email = value }
    baseURL="https://localhost:44329/api/"
  
    constructor(private http:HttpClient) { }
  
   
    loginData(user: any)
    {
      return this.http.post(this.baseURL + 'Authentication/Login', JSON.stringify(user),{
        headers:new HttpHeaders({
          'Content-Type':"application/json",
          "Authorization":"Bearer" +sessionStorage.getItem('token')
        })
      })
    
    
    }
  
   
  
  Register(user: any)
  {
    return this.http.post(this.baseURL +'Authentication/Register', JSON.stringify(user),{
           headers : new HttpHeaders({
             'Content-Type':'application/json',
             "Authorization":"Bearer" +sessionStorage.getItem('token')
           })
  
         })//.subscribe()
  
  }
    
    
}
    
    
    