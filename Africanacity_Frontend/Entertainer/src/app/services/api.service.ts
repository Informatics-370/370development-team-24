import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Profile } from '../models/Profile';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'http://localhost:49991/api/User';
  private localStorageKey = 'currentUser';
  constructor(private http: HttpClient) {}

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  getUsers() {
    return this.http.get<any>(this.baseUrl);
  }
 
  private updatedUser: any;

  setUpdatedUser(user: any) {
    this.updatedUser = user;
  }

  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.baseUrl}/Profile`, { headers });
  }
  
  GetAllUsers(): Observable<any>{
    return this.http.get(`${this.baseUrl}/ProfileIn`)
    .pipe(map(result => result))
  }

  GetUser(): Observable<any>{
    return this.http.get(`${this.baseUrl}/Profile`)
    .pipe(map(result => result))
  }

  getUser(): any {
    const userData = localStorage.getItem(this.localStorageKey);

    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  }
  
  getProfileInformation(username: string): Observable<any> {
    const url = `${this.baseUrl}/GetUser/${username}`;
    return this.http.get<any>(url);
  }
  
  deleteUser(UserId: number)
  {
    return this.http.delete<string>(`${this.baseUrl}/DeleteUser` + "/" + UserId, this.httpOptions)
  }

  editUser(UserId: number, user: Profile)
  {
    return this.http.put(`${this.baseUrl}/EditUser/${UserId}`,user, this.httpOptions)
  }

  
    // changePassword(oldPassword: string, newPassword: string): Observable<any> {  
    //   const token = localStorage.getItem('token');

    //   const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //    'Authorization':  `Bearer ${token}`
    //     // Add any additional headers you may need, e.g., authentication headers
    //   });
  
    //   const body = {
    //     oldPassword: oldPassword,
    //     newPassword: newPassword
    //   };
  
    //   return this.http.post<any>(this.baseUrl, body, { headers: headers });
    // }
  }
  

