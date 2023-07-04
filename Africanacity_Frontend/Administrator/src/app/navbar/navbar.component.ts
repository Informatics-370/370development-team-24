import { Component } from '@angular/core';

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
    this.showDropdown = false;
    // Perform any other actions based on the selected option
  }

  constructor()
    
  {
    
 }
}

  

