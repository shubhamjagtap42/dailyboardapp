import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  getlogin(data: any) {
    console.log('inside service',data);
    // return this.http.post(`${environment.url3}/login`,data)
    return this.http.post(`http://192.168.2.170:3000/login`, data);
  }
  async getlogin1(data:any):Promise<any>
  {
    const url = `http://192.168.2.170:3000/login`;

    try {
      const response = await axios.post(url, data);
      console.log('Login Successsfull', response.data);
      return response.data;
    } catch (error) {
      console.error('Login Failed', error);
      throw error;
    }
  }
  async sendEmail1(email:any):Promise<any>
  {
    const url = 'http://192.168.2.170:3000/email';
    const data = {email}

    try {
      const response = await axios.post(url, data);
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
      console.log('Email sent successfully', response.data);
      return response.data;

    } catch (error) {
      console.error('Failed to send email', error);
      throw error;
    }
    // return this.http.post(`http://192.168.2.170:3000/email`,{email})
  }


  getregister(data:any)
  {
    return this.http.post(`http://192.168.2.170:3000/signup`,data) 
  }



  async getSignUp(data:any): Promise<any>
  {
    const url = `http://192.168.2.170:3000/signup`;
    // const data = {email}

    // return this.http.post(url,data).toPromise();


    try {
      const response = await axios.post(url,data);
      console.log('Register successfully',response.data);
      return response.data
      
    } catch(error)
    {
      console.error('Failed',error);
      throw error
      
    }
    // return this.http.post(`http://192.168.2.170:3000/signup`,data)
  }
  async sendSignupEmail(email: string): Promise<any> {
    const url = `http://192.168.2.170:3000/email`;
    const data = { email };

    try {
      const response = await axios.post(url, data);
      console.log('Signup email sent successfully', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to send signup email', error);
      throw error;
    }
  // }
}
}
