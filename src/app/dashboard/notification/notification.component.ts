import { Component,Input, OnInit } from '@angular/core';
import { LawyerService } from 'src/services/lawyer.service';
// import { DataServiceService } from '../data-service.service';
import { NotificationService } from 'src/services/notification.service';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  products: any[] = [];
  @Input() notifications: any[] = [];
  @Input() isOpen: boolean = false;
  @Input() unreadCount: any;

  readNotifications: any[] = [];

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

  // get unreadCount(): number {
  //   return this.notifications.filter((notification) => !notification.isRead)
  //     .length;
  // }

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
}

//   toggleNotifications(): void {
//     this.showNotifications = !this.showNotifications;
//     if (this.showNotifications) {
//       this.markAllAsRead();
//     }
//   }

//   fetchNotifications(): void {
//     this.dataservice.getNotifications().subscribe((data) => {
//       this.notifications = data.notifications;
//       this.unreadCount = data.unreadCount;
//     });
//   }

//   markAsRead(notificationId: number): void {
//     this.dataservice.markAsRead(notificationId).subscribe(() => {
//       const index = this.notifications.findIndex((n) => n.id === notificationId);
//       if (index !== -1) {
//         this.notifications.splice(index, 1);
//         this.unreadCount--;
//       }
//     });
//   }

//   markAllAsRead(): void {
//     this.dataservice.getNotifications().subscribe(() => {
//       this.notifications = [];
//       this.unreadCount = 0;
//     });
//   }
// }

// cities:any[]=[];
// ngOnInit() {
//   this.lawyer.getCases().subscribe((data:any)=>{
//     this.cities =data;
//     console.log(data);

//   })

// }

// This is also a Notification we can try this

// this.notify.notification$.subscribe((notification) => {

//   console.log(notification);

//   // New notification received, do something with it if needed
// });
// }
// toggleNotifications() {
// this.isOpen = !this.isOpen;
// }
// markAsRead(notification: any) {
// this.notify.markNotificationAsRead(notification);
// }
// getUnreadNotifications() {
// return this.notify.getUnreadNotifications();
// }
// getReadNotifications() {
// return this.notify.getReadNotifications();
// }
