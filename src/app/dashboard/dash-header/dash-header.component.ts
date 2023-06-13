import { Component } from '@angular/core';
import { LawyerService } from 'src/services/lawyer.service';
import { NotificationService } from 'src/services/notification.service';

@Component({
  selector: 'app-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrls: ['./dash-header.component.css']
})



export class DashHeaderComponent {
  products: any[] = [];
  notifications: any[] = [];
   isOpen: boolean = false;
 unreadCount: any;

  readNotifications: any[] = [];


  homeFlag : boolean =false

  constructor(
    private lawyer: LawyerService,

    private notify: NotificationService
  ) {

  }
  ngOnInit(): void {
    // this.fetchNotifications();
    console.log('First call ');

    // this.notifications = this.notify.existingOrders;

    this.notify.notification$.subscribe((notification) => {
      this.notifications.push(notification);
    });

    const unreadNotifications = this.notifications.filter(
      (notification) => !notification.isRead
    );

    // const notificationCountBadge = document.getElementById("notificationCountBadge");
    // if (notificationCountBadge) {
    //   notificationCountBadge.innerHTML = String(unreadNotifications.length);
    // }

    // this.notify.startPolling();
    this.notify.checkForUpdates();
  }

  getUnreadNotificationsCount(): number {
    return this.notifications.filter((notification) => !notification.isRead).length;
  }
  dismissNotification(notification: any) {
    console.log('second call');

    notification.isRead = true;
    this.notifications = this.notifications.filter((n) => n !== notification);

    //   const existingOrder = this.notify.existingOrders.find((order) => order.message === notification.message);
    // if (existingOrder) {
    //   existingOrder.isRead = true;
    // }
  }

  toggleNotifications() {
    console.log('third call');

    this.isOpen = !this.isOpen;

  }
  markAsRead(notification: any) {
    if (!notification.isRead) {
      notification.isRead = true;
      this.readNotifications.push(notification);
      // this.notifications = this.notifications.filter(n => n !== notification);

      console.log(this.readNotifications, 'yes i read that notifiction');
    }
  }












//   displaymenus(menuName: string) {
  
//     if (menuName == 'report') {
  
//       this.homeFlag = true;
  
     
  
//     }
  
// }

}