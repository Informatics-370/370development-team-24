import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = '/api/send-email'; 

  constructor(private http: HttpClient) { }

  sendEmail(recipientEmail: string): Observable<any> {
    const body = { recipientEmail }; 

    return this.http.post(this.apiUrl, body);
  }
}