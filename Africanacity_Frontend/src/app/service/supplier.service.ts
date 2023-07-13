import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Supplier } from '../shared/supplier';

@Injectable({
    providedIn: 'root'
  })
  export class SupplierService {
  
    apiUrl = 'http://localhost:49991/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }

    constructor(private httpClient: HttpClient) { 
    }
    //Get All suppliers
    GetAllSuppliers(): Observable<any>{
        return this.httpClient.get(`${this.apiUrl}Supplier/GetAllSuppliers`)
        .pipe(map(result => result))
      }

      GetSupplier(supplierId: number) {
        return this.httpClient.get(`${this.apiUrl}Supplier/GetSupplier` + "/" + supplierId)
        .pipe(map(result => result))
      }

    // Get Supplier Types
    GetAllSupplierTypes(): Observable<any>{
        return this.httpClient.get(`${this.apiUrl}SupplierType/GetAllSupplierTypes`)
        .pipe(map(result => result))
      }

      DeleteSupplier(supplierId: Number)
      {
        return this.httpClient.delete<string>(`${this.apiUrl}Supplier/DeleteSupplier` + "/" + supplierId, this.httpOptions)
      }

      EditSupplier(supplierId: number, supplier: Supplier)
      {
        return this.httpClient.put(`${this.apiUrl}Employee/EditEmployee/${supplierId}`,supplier, this.httpOptions)
      }
   

}