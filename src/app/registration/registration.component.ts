import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  registrationForm!: FormGroup;
  loading!: false;
  name: any = '';
  email: any = '';
  password: any = '';
  mobile: any = '';
  searchoption1:any='';
  searchoption2:any='';
  searchoption3:any='';

  constructor(private route: Router, private loginservie: LoginService) {}

  ngOnInit() {
    this.registrationForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/),
      ]),

      password: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
      ]),
      searchoption1: new FormControl('', [Validators.required]),
      searchoption2: new FormControl('', [Validators.required]),
      searchoption3: new FormControl('', [Validators.required]),
    });
  }

  register() {

    console.log(this.registrationForm.value,"This is reg form");

    //send SMS to the register user
    // this.loginservie.sendSMS({phoneNumber:this.mobile,}).subscribe((data:any)=>{
    //   console.log(data,"send sms service works");  
      
    // })
    

    if (this.registrationForm.valid) {
      const registrationData = this.registrationForm.value;

      // console.log(registrationData,"this is registration data");
      

      this.loginservie.getregister(registrationData).subscribe((response:any)=>{
        console.log(response,"Registration Successful");

        
        this.route.navigate(['/login'])

        
      },
      (error:any) => {

        console.log(error,"Registration Failed");
        
      }
      
      )

      // Pass the email and password to the login page
    }
  }

  signup() {
  
    this.loginservie.getSignUp(this.registrationForm.value)

      .then((response:any) => {
       console.log(response,'Registration Successfull');
       
          this.registrationForm.reset();
        this.route.navigate(['/login'])

          
          })
      
      .catch((error) => {
        console.error('Signup failed', error);
      });
  }
  
}
