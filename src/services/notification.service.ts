import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSource = new Subject<any>();
  notification$ = this.notificationSource.asObservable();
   
  private alive = true;
  existingOrders: any[] = [];
  private orders: any[] = [];
  private notifications: any[] = [];
  
  private readNotifications: any[] = [];
  // isUserLoggedIn: boolean=false;


  constructor(private http: HttpClient) {
    // console.log("first in service");

    // this.startPolling();
    
  }

  //  startPolling() {
  //   console.log("second in service");
  //   this.alive = true;  
    
  //   interval(500000) // Poll every 5 seconds (adjust the duration as needed)
  //     .pipe(takeWhile(() => this.alive))
  //     .subscribe(() => {
  //       this.checkForUpdates();
  //     });
  // }

  // stopPolling() {
  //   console.log("stopPolling");
  //   this.alive = false; // Set it to false when stopping the polling
  // }

  // polling()
  // {
  //   this.checkForUpdates();

  // }
  

   checkForUpdates() {
    // console.log("third in service");

    if (this.isUserLoggedIn()){
      
    this.http.get<any[]>('http://192.168.2.170:3000/orders')
      .subscribe(
        (data: any[]) => {
          const updatedOrders = this.findUpdatedOrders(data);
          // this.generateNotifications(updatedOrders);
          console.log(updatedOrders, 'order updated');

          // Generate notifications for updated orders
          const notifications = updatedOrders.map((order: any) => ({
            message: `Order No: ${order.cnrNo} update`,
            isRead: false
          }));


          notifications.forEach((notification: any) => {
            this.notificationSource.next(notification);
          });
        },
        (error: any) => 
        {
          console.error('Error fetching data:', error);
        }
      );
  }
}


isUserLoggedIn() {
 
  return this.isUserLoggedIn;
}

 findUpdatedOrders(newOrders: any[]): any[] { 
    console.log("fourth in service");
    
  const existingOrders = this.orders;
  const updatedOrders: any[] = [];

  for (let newOrder of newOrders)
  {
    
    const existingOrder = existingOrders.find((order: any) => order.cnrNo === newOrder.cnrNo);
    if (!existingOrder) {
      // New order, add it to the updated orders list
      updatedOrders.push(newOrder);
    } else if (existingOrder.updatedAt < newOrder.updatedAt) {
      // Existing order with a more recent updatedAt value, add it to the updated orders list
      updatedOrders.push(newOrder);
    }
  }

  // Update the orders list with the new orders
  this.orders = [...existingOrders, ...updatedOrders];

  return updatedOrders;
}

  
  

  ngOnDestroy() {
    console.log("fifth in service");
    
    this.alive = false; // Stop polling when the service is destroyed
  }

  sendNotification(message: string) {


    console.log('Sending notification:', message);
  }
}






