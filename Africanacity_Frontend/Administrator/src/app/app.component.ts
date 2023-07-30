import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './UserService/auth.service';
import { UserStoreService } from './UserService/user-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Africanacity_System';

  toggleLogin = JSON.parse(localStorage.getItem('User')!)

  public role!:string;
  public fullName : string = "";
  public UserId!: number;
  
  constructor(
    private auth: AuthService,
    private router: Router,
    private userStore: UserStoreService, )  
  { }

  ngOnInit() {

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

       //UserId
       this.userStore.getUserIdFromStore()
       .subscribe(val=>{
         const userFromToken = this.auth.getUserIdFromToken();
         this.UserId = val || userFromToken;
       });
  }

}
