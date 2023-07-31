import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Profile } from '../shared/Profile';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'http://localhost:49991/api/Authentication';
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

  deleteAdmin(UserId: number)
  {
    return this.http.delete<string>(`${this.baseUrl}/DeleteAdmin` + "/" + UserId, this.httpOptions)
  }

  editAdmin(UserId: number, user: Profile)
  {
    return this.http.put(`${this.baseUrl}/EditAdmin/${UserId}`,user, this.httpOptions)
  }

}
