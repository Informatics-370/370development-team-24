import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showTabs=false;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route should display tabs
        this.showTabs = event.urlAfterRedirects.includes('/home') || 
                        event.urlAfterRedirects.includes('/table')||
                        event.urlAfterRedirects.includes('/order') || 
                        event.urlAfterRedirects.includes('/kitchen-screen')
                        
 
                        
                       
      }
    });
  } 

}

