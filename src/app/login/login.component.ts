import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from 'src/services/login.service';
import { NotificationService } from 'src/services/notification.service';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  myform!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  email: any;
  password: any;
  loginarray: any[] = [];

  constructor(
    private loginservie: LoginService,
    private notify: NotificationService,
    private router: Router,
    private message: MessageService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    console.log(this.loginForm.value, 'HIIII');

    this.loginservie.getlogin(this.loginForm.value).subscribe(
      (data: any) => {
        this.router.navigate(['home']);
        console.log(data, 'this is data');
        this.loginarray = data;
        console.log(this.loginarray);
        this.notify.sendNotification('Login Successful!');
      },
      (error: any) => {
        if (error.status === 401) {
          this.notify.sendNotification('Invalid email or password.');
          console.log('else If 401');

          this.router.navigate(['login']);
        } else if (error.status === 404) {
          this.notify.sendNotification('User not found.');
          this.router.navigate(['login']);
          console.log('else if user not found 404');
        } else {
          this.notify.sendNotification(
            'An error occurred. Please try again later.'
          );
          this.router.navigate(['login']);
        }
      }
    );

    console.log(this.loginForm.value, 'HIIII'); // Code added
    // Further processing for the form value
  }

  login1() {
    this.loginservie
      .getlogin1(this.loginForm.value)
      .then((response: any) => {
        console.log('Login successful:', response.data);
        const token = response.token;
        localStorage.setItem('token', token);
        this.loginservie
          .sendEmail1(this.email)
          .then(() => {
            console.log('Email sent successfully');
            // Clear form fields
            this.loginForm.reset();
          })
          .catch((error) => {
            console.error('Failed to send email', error);
          });
      })
      .catch((error) => {
        console.error('Login failed', error);
      });
  }

  sendEmailNtification() {}
}

//   myform!: FormGroup;
//   email: any;
//   password: any;
//   loginarray: any[] = [];

//   constructor(
//     private loginservie: LoginService,
//     private notify: NotificationService,
//     private router: Router,
//     private message:MessageService
//   ) {}

//   ngOnInit() {
//     this.myform = new FormGroup({
//       email: new FormControl('',[Validators.required]),
//       password: new FormControl('',[Validators.required]),
//     });
//   }

//   login() {
//   console.log(this.myform.value, 'HIIII');

//   this.loginservie.getlogin(this.myform.value).subscribe(
//     (data: any) => {
//       this.router.navigate(['home']);
//       console.log(data, 'this is data');
//       this.loginarray = data;
//       console.log(this.loginarray);
//       this.notify.sendNotification('Login Successful!');
//     },
//     (error: any) => {
//       if (error.status === 401) {
//         this.notify.sendNotification('Invalid email or password.');
//         console.log("else If 401");
//         this.showError();

//         this.router.navigate(['login']);
//       } else if (error.status === 404) {
//         this.notify.sendNotification('User not found.');
//         this.router.navigate(['login']);
//         console.log("else if user not found 404");
//         this.showError();
//       } else {
//         this.notify.sendNotification(
//           'An error occurred. Please try again later.'
//         );
//         this.router.navigate(['login']);
//       }
//     }
//   );

//   console.log(this.myform.value, 'HIIII'); // Code added
//   // Further processing for the form value
// }

//   showError() {
//     this.message.add({severity:'error', summary: 'Error', detail: 'Invalid Credentials'});
// }
