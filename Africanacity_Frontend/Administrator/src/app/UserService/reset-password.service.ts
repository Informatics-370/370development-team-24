import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../shared/reset-password.model';



@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private baseUrl: string = 'http://localhost:49991/api/Authentication';
    constructor(private http: HttpClient) 
    { }

  sendResetPasswordLink(email: string){
    return this.http.post<any>(`${this.baseUrl}/send-reset-email/${email}`, {})
  }
  
  resetPassword (resetPasswordObj: ResetPassword){
    return this.http.post<any>(`${this.baseUrl}/Reset-password`, resetPasswordObj);
  }

  ChangePassword (resetPasswordObj: ResetPassword){
    return this.http.post<any>(`${this.baseUrl}/Change-password`, resetPasswordObj);
  }
}
