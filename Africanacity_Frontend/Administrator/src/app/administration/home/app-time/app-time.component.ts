import { Component } from '@angular/core';

@Component({
  selector: 'app-app-time',
  templateUrl: './app-time.component.html',
  styleUrls: ['./app-time.component.css']
})
export class AppTimeComponent {
  currentTime: Date = new Date();

  constructor() { }

  ngOnInit(): void {
    // Update the current time every second
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }
}
