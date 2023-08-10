import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Africanacity_System';

  toggleLogin = JSON.parse(localStorage.getItem('User')!)

// Search Function for Employee
performSearch(searchTerm: string) {
  
  console.log('Search term:', searchTerm);
  
}

}
