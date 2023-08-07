import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/Profile';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})



export class NavbarComponent { 

  showDropdown = false;
  selectedOption = '';

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    this.showDropdown = true;
    // Perform any other actions based on the selected option
  }

  constructor( 
    private auth: AuthService,
    private router: Router
    )
    
  { }
  
 logout(){
  this.auth.signOut();
}

view(): void {
  const url = this.router.serializeUrl(this.router.createUrlTree(['/view-profile']));
  window.location.href = url;
}

}


  

