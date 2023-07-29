import { AuthService } from './../../services/auth.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/services/user-store.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Entertainment } from 'src/app/models/Entertainment';
import { BookingService } from 'src/app/services/Booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Booking } from 'src/app/models/Booking';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  entertainmentTypeData:Entertainment[]=[]
  toastContainer: any;

  public users:any = [];
  public role!:string;
  public fullName : string = "";
  formData = new FormData();
  fileNameUploaded = ''

  bookingForm: FormGroup = this.fb.group({
   firstName: ['', Validators.required],
   demo: ['', Validators.required],
   lastName: ['', Validators.required],
   contactNumber: [null, Validators.required],
   entertainmenttype: [null, Validators.required],
   email: ['', Validators.required],
   Instagram: ['', Validators.required]
 })

 constructor(private apiService: BookingService, 
   private fb: FormBuilder,
   private router: Router, 
   private snackBar: MatSnackBar,
   private api : ApiService, 
   private auth: AuthService, 
   private userStore: UserStoreService) { }

   
  ngOnInit() {
    this.api.getUsers()
    .subscribe(res=>{
    this.users = res;
    }); 

    this.GetAllEntertainment();
  
    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
    });

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  }

GetAllEntertainment(){
  this.apiService.GetAllEntertainment().subscribe(result => {
    let bookingList:any[] = result
   bookingList.forEach((element) => {
      this.entertainmentTypeData.push(element)
   });
  });
}

 uploadFile = (files: any) => {
   let fileToUpload = <File>files[0];
   this.formData.append('demo', fileToUpload, fileToUpload.name);
   this.fileNameUploaded = fileToUpload.name
 }

 onSubmit() {
   if(this.bookingForm.valid)
   {
     this.formData.append('firstName', this.bookingForm.get('firstName')!.value);
     this.formData.append('lastName', this.bookingForm.get('lastName')!.value);
     this.formData.append('contactNumber', this.bookingForm.get('contactNumber')!.value);
     this.formData.append('email', this.bookingForm.get('email')!.value);
     this.formData.append('Instagram', this.bookingForm.get('Instagram')!.value);
     this.formData.append('entertainmenttype', this.bookingForm.get('entertainmenttype')!.value);
     
     this.apiService.addBooking(this.formData).subscribe(() => {
       this.clearData()
       this.router.navigateByUrl('home').then((navigated: boolean) => {
         if(navigated) {
           this.snackBar.open(this.bookingForm.get('firstName')!.value + ` Booking request successfully`, 'X', {duration: 5000});
         }
      });
     });
   }
 }

 clearData(){
   this.formData.delete("demo");
   this.formData.delete("firstName");
   this.formData.delete("lastName");
   this.formData.delete("contactNumber");
   this.formData.delete("email");
   this.formData.delete("Intsagram");
   this.formData.delete("entertainmenttype");
 }

  logout(){
    this.auth.signOut();
  }

}


