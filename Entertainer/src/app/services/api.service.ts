import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'https://localhost:49991/api/User';
  private localStorageKey = 'currentUser';
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any>(this.baseUrl);
  }

  getProfile(UserId: String): Observable<any> {
    const token = localStorage.getItem('token'); // Use getToken() instead of authToken
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.baseUrl}/Profile/${UserId}`, { headers });
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

}
