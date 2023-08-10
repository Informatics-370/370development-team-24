import { AuthService } from './../../services/auth.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/services/user-store.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Entertainment } from 'src/app/models/Entertainment';
import { BookingService } from 'src/app/services/Booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/models/Booking';
import { HttpClient } from '@angular/common/http';
import { InventoryItem } from 'src/app/models/inventoryitem';
import { DataService } from 'src/app/services/data.Service';
import { BookingEvent } from 'src/app/models/bookingevent';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  entertainmentTypeData:Entertainment[]=[]
  toastContainer: any;

  public users:any = [];
  bookingevents: BookingEvent[]=[];
  editBooking: BookingEvent = new BookingEvent();
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
   eventname: ['', Validators.required],
   Instagram: ['', Validators.required]
 });

 constructor(
  private apiService: BookingService,
   private fb: FormBuilder,
   private router: Router,
   private snackBar: MatSnackBar,
   private api : ApiService,
   private auth: AuthService,
   private route: ActivatedRoute,
   private userStore: UserStoreService,
   private dataService:DataService ) {

    this.bookingForm.controls['eventname'].disable();
   }


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
    });

    this.route.params.subscribe(params => {
      this.dataService.GetEvent(params['id']).subscribe(res => {
        this.editBooking = res as BookingEvent;
        this.bookingForm.controls['eventname'].setValue(this.editBooking.name);
      });
    });

    this.GetAllEvents()
  }

GetAllEntertainment(){
  this.apiService.GetAllEntertainment().subscribe(result => {
    let bookingList:any[] = result
   bookingList.forEach((element) => {
      this.entertainmentTypeData.push(element)
   });
  });
}

GetAllEvents()
  {
    this.dataService.GetAllEvents().subscribe(result => {
      let eventsList:any[] = result
      eventsList.forEach((element) => {
        this.bookingevents.push(element)

      });
    })
  }

 uploadFile = (files: any) => {
   let fileToUpload = <File>files[0];
   this.formData.append('demo', fileToUpload, fileToUpload.name);
   this.fileNameUploaded = fileToUpload.name
 }

//  onSubmit() {
//    if(this.bookingForm.valid)
//    {
//      this.formData.append('firstName', this.bookingForm.get('firstName')!.value);
//      this.formData.append('lastName', this.bookingForm.get('lastName')!.value);
//      this.formData.append('contactNumber', this.bookingForm.get('contactNumber')!.value);
//      this.formData.append('email', this.bookingForm.get('email')!.value);
//      this.formData.append('Instagram', this.bookingForm.get('Instagram')!.value);
//     //  this.formData.append('entertainmenttype', this.bookingForm.get('entertainmenttype')!.value);
//     //  this.formData.append('events', this.bookingForm.get('events')!.value);
//     const entertainmentTypeId = parseInt(this.bookingForm.get('entertainmenttype')!.value);
//     const eventId = parseInt(this.bookingForm.get('events')!.value);

// // Then use these parsed values in your FormData
// this.formData.append('entertainmenttype', entertainmentTypeId.toString());
// this.formData.append('events', eventId.toString());


//      this.apiService.addBooking(this.formData).subscribe(() => {
//        this.clearData()
//        this.router.navigateByUrl('home').then((navigated: boolean) => {
//          if(navigated) {
//            this.snackBar.open(this.bookingForm.get('firstName')!.value + ` Booking request successfully`, 'X', {duration: 5000});
//          }
//       });
//      });
//    }
//  }
onSubmit() {
  if (this.bookingForm.valid) {
    // ... your existing code to append form data to formData ...
         this.formData.append('firstName', this.bookingForm.get('firstName')!.value);
     this.formData.append('lastName', this.bookingForm.get('lastName')!.value);
     this.formData.append('contactNumber', this.bookingForm.get('contactNumber')!.value);
     this.formData.append('email', this.bookingForm.get('email')!.value);
     this.formData.append('Instagram', this.bookingForm.get('Instagram')!.value);
     this.formData.append('entertainmenttype', this.bookingForm.get('entertainmenttype')!.value);
    this.formData.append('eventname', this.bookingForm.get('eventname')!.value);
    this.formData.append('additional', this.bookingForm.get('additional')!.value);


    this.apiService.addBooking(this.formData).subscribe(
      () => {
        this.clearData();
        this.router.navigateByUrl('home').then((navigated: boolean) => {
          if (navigated) {
            this.snackBar.open(
              this.bookingForm.get('firstName')!.value + ` Booking request successfully`,
              'X',
              { duration: 5000 }
            );
          }
        });
      },
      (error) => {
        console.error('Error submitting booking:', error);
      }
    );
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
   this.formData.delete("additional");
   this.formData.delete("eventname");
 }

  logout(){
    this.auth.signOut();
  }

}


