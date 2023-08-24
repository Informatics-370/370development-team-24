import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { Supplier } from '../shared/supplier';
import { SupplierType } from '../shared/SupplierTypes';

@Injectable({
    providedIn: 'root'
  })
  export class SupplierService {
  
    apiUrl = 'https://localhost:49991/api/'
  
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

      DeleteSupplier(supplierId: Number)
      {
        return this.httpClient.delete<string>(`${this.apiUrl}Supplier/DeleteSupplier` + "/" + supplierId, this.httpOptions)
      }

      // EditSupplier(supplierId: Number, supplier: Supplier)
      // {
      //   return this.httpClient.put(`${this.apiUrl}Supplier/EditSupplier/${supplierId}`,supplier, this.httpOptions)
      // }

      EditSupplier(supplierId: number, supplier: Supplier): Observable<any> {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
        return this.httpClient.put(`${this.apiUrl}Supplier/EditSupplier/${supplierId}`, supplier, httpOptions);
      }

      AddSupplier(supplier: Supplier) {
        return this.httpClient.post(`${this.apiUrl}Supplier/AddSupplier`, supplier, this.httpOptions)
          .pipe(
            catchError(error => {
              console.error('Error adding supplier:', error);
              return throwError(error);
            })
          );
      }


    // Get Supplier Types

    GetAllSupplierTypes(): Observable<any>{
      return this.httpClient.get(`${this.apiUrl}SupplierType/GetAllSupplierTypes`)
      .pipe(map(result => result))
    }
    

    GetSupplierType(supplier_TypeId: Number) {
      return this.httpClient.get(`${this.apiUrl}SupplierType/GetSupplierType` + "/" + supplier_TypeId)
      .pipe(map(result => result))
    }
    
    DeleteSupplierType(supplier_TypeId: Number)
    {
      return this.httpClient.delete<string>(`${this.apiUrl}SupplierType/DeleteSupplierType` + "/" + supplier_TypeId, this.httpOptions)
    }

    EditSupplierType(supplier_TypeId: number, suppliertype: SupplierType)
    {
      return this.httpClient.put(`${this.apiUrl}SupplierType/EditSupplierType/${supplier_TypeId}`,suppliertype, this.httpOptions)
    }

    AddSupplierType(suppliertype: SupplierType)
    {
       return this.httpClient.post(`${this.apiUrl}SupplierType/AddSupplierType`, suppliertype, this.httpOptions)
    }
  
}