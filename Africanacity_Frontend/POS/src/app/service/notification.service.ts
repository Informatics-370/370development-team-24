import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<string>();
  public notification$ = this.notificationSubject.asObservable()

  constructor() { }

  addNotification(message: string) {
    console.log('Notification:', message); 
    this.notificationSubject.next(message);
  }

  
}
