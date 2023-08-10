import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { BookingEvent } from '../models/bookingevent';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  

  apiUrl = 'https://localhost:49991/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {   
  }

/************************************EVENTS******************************/
GetAllEvents(): Observable<any>
{
  return this.httpClient.get(`${this.apiUrl}Event/GetAllEvents`)
  .pipe(map(results => results))
}

GetEvent(eventId: Number)
{
  return this.httpClient.get(`${this.apiUrl}Event/GetEvent` + "/" + eventId).pipe(map(result => result))
}

AddNewEvent(bookingevent : BookingEvent)
{
  return this.httpClient.post(`${this.apiUrl}Event/AddNewEvent`, bookingevent, this.httpOptions)
}

EditEvent(eventId: Number, bookingevent: BookingEvent)
{
  return this.httpClient.put(`${this.apiUrl}Event/EditEvent/${eventId}`, bookingevent, this.httpOptions)
}

DeleteEvent(eventId: Number)
{
  return this.httpClient.delete<string>(`${this.apiUrl}Event/DeleteEvent` + "/" + eventId, this.httpOptions)
}


}
