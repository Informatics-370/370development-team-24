import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Booking } from '../models/Booking';



@Injectable({
  providedIn: 'root'
})
export class BookingService {
    apiUrl = 'https://localhost:49991/api/'



    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) { 
    }

    addBooking(file:FormData){
    
      return this.httpClient.post(`${this.apiUrl}Booking/RequestBk`, file)
    }
  
    getBooks(){
      return this.httpClient.get(`${this.apiUrl}Booking/BookedListing`)
      .pipe(map(result => result))
    }

  /* For Booking Function */
    getBooking(bookingId: number) {
      return this.httpClient.get(`${this.apiUrl}Booking/GetBooking` + "/" + bookingId)
      .pipe(map(result => result))
    }
  
    GetAllBookings(): Observable<any>{
      return this.httpClient.get(`${this.apiUrl}Booking/GetBookings`)
      .pipe(map(result => result))
    }
  
    GetAllEntertainment(): Observable<any>{
      return this.httpClient.get(`${this.apiUrl}Booking/EntertainmentTypes`)
      .pipe(map(results => results))
      
    }
  
    RequestBooking(booking: Booking)
    {
       return this.httpClient.post(`${this.apiUrl}Booking/RequestBooking`, booking, this.httpOptions)
    }

    DeleteBooking(bookingId: number) {
      const url = `${this.apiUrl}Booking/RequestDeleteBooking/${bookingId}`;
      return this.httpClient.delete(url, this.httpOptions);
    }

    
    AddBooking(booking: Booking)
    {
       return this.httpClient.post(`${this.apiUrl}Booking/AddBooking`, booking, this.httpOptions)
    }

  //Trail 
  Trail(file:FormData){  
    return this.httpClient.post(`${this.apiUrl}Booking/Trail`, file)
  }

  


// Update the EditBooking function to accept FormData
      EditBooking(bookingId: number, bookingData: FormData) {
      const url = `${this.apiUrl}Booking/EditBooking/${bookingId}`;
       return this.httpClient.put(url, bookingData);
      }

     GetBookingInfor(email: string): Observable<any> {
      const url = `${this.apiUrl}Booking/GetBookingInfor/${email}`; 
      return this.httpClient.get<any>(url);
    }
    
}
