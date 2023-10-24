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
                        event.urlAfterRedirects.includes('/kitchen-screen') ||
                        event.urlAfterRedirects.includes('/view-kitchen-orders') ||
                        event.urlAfterRedirects.includes('/add-item')
                     

                      /* if (event.urlAfterRedirects === '/edit-kitchen-order') {
                        this.showTabs = false;
                      } else {
                        this.showTabs = true;
                      }
                    */
                        
 
                        
                       
      }
    });
  } 

}

