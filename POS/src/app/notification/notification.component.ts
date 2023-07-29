import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent  implements OnInit {
  notifications: string[] = [];
 


  constructor(private notificationService: NotificationService) { }

  ngOnInit() {

    this.subscribeToNotifications();
  }

  subscribeToNotifications() {
    this.notificationService.notification$.subscribe((message: string) => {
      this.notifications.push(message);
    });
  }

}
