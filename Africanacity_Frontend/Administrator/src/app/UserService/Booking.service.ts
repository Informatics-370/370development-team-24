import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Booking } from '../shared/Booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
    apiUrl = 'http://localhost:49991/api/'



    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) { 
    }
    
    moveBookingToConfirmed(bookingId: number): Observable<any> {
      return this.httpClient.post(`${this.apiUrl}Booking/MoveBookingToConfirmed/${bookingId}`, null);
    }
    

    getRequestBooks(){
      return this.httpClient.get(`${this.apiUrl}Booking/ManageBookedListing`)
      .pipe(map(result => result))
    }

    getBooks(){
      return this.httpClient.get(`${this.apiUrl}Booking/BookedListing`)
      .pipe(map(result => result))
    }

    addBooking(file:FormData){
    
      return this.httpClient.post(`${this.apiUrl}Booking/AddBk`, file)
    }
  
  /* For Booking Function */
    getBooking(bookingId: number) {
      return this.httpClient.get(`${this.apiUrl}Booking/GetBooking` + "/" + bookingId)
      .pipe(map(result => result))
    }
  
    GetAllBookings(): Observable<any>{
      return this.httpClient.get(`${this.apiUrl}Booking/ManageBooking`)
      .pipe(map(result => result))
    }
  
    GetAllEntertainment(): Observable<any>{
      return this.httpClient.get(`${this.apiUrl}Booking/EntertainmentTypes`)
      .pipe(map(results => results))
      
    }
  
    AddBooking(booking: Booking)
    {
       return this.httpClient.post(`${this.apiUrl}Booking/AddBooking`, booking, this.httpOptions)
    }
  
  
    DeleteBooking(bookingId: Number)
    {
      return this.httpClient.delete<string>(`${this.apiUrl}Booking/DeleteBooking` + "/" + bookingId, this.httpOptions)
    }

    ManageDeleteBooking(bookingId: Number)
    {
      return this.httpClient.delete<string>(`${this.apiUrl}Booking/ManageDeleteBooking` + "/" + bookingId, this.httpOptions)
    }
    EditBooking(bookingId: number, booking: Booking)
     {
       return this.httpClient.put(`${this.apiUrl}Booking/EditBooking/${bookingId}`,booking, this.httpOptions)
     }
  
}
