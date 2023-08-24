import { Component, OnInit } from '@angular/core';
import { BookingEvent } from 'src/app/models/bookingevent';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.Service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bookingevents: BookingEvent[]=[]
  public fullName : string = "";

  constructor( 
    private auth: AuthService,
    private api : ApiService, 
   private userStore: UserStoreService,
   private dataService:DataService 
    ) { }

  ngOnInit(): void {
    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
    });
    this.GetAllEvents()
    console.log(this.bookingevents)
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

  logout(){
    this.auth.signOut();
  }

}
