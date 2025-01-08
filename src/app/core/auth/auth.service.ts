import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { GeneralFunctionService } from '../function/general-function.service';

@Injectable()
export class AuthService {
  baseAPI = environment.baseAPI;
  token: any;
  tmp_OTP_sid:any

  constructor(private http: HttpClient,
              private router: Router,
              private allFunction : GeneralFunctionService,
              private cookieService: CookieService) {}
  
  //# Sign in user by phone number 
  signinUserByPhone(phone_number: string, password:string) {
    
    let tmp_data={
      "country_code":"855", 
      "phone_number":phone_number,
      "password":password,
      "signin_type": "phone_number"
    }
    const url = this.baseAPI + '/api/member/signin/';
    return this.http.post(url,tmp_data);

  }
  
  //# Sign in user by email
  signinUserByEmail(email: string, password:string) {     
    
    let tmp_data={
      "email":email,
      "password":password,
      "signin_type": "email"
    }
    const url = this.baseAPI + '/api/member/signin/';
    return this.http.post(url,tmp_data);

  }

  //# Get user balance
  getUserBalance(){
    const url = this.baseAPI + '/api/member/balance/';
    return this.http.get(url);
  }

  //# Sign up user  phone
  signupUserByPhone(phone_number: string, name:string, password: string, accept_notification: boolean) {
    let tmp_data={
      "country_code":"855",
      "phone_number":phone_number,
      "name":name,
      "password":password,
      "accept_notification": accept_notification
    }
    const url = this.baseAPI + '/api/member/signup/';
    return this.http.post(url,tmp_data);
  }

  //# Sign up user  phone
  signupUserByEmail(email: string, name:string, password: string, accept_notification: boolean) {
      let tmp_data={
        "email":email,
        "name":name,
        "password":password,
        "accept_notification": accept_notification
      }
      const url = this.baseAPI + '/api/member/signup/';
      return this.http.post(url,tmp_data);
  }

  //# set value OTP Sid after singup success
  setTmpOTPSid(sid:any){
    this.tmp_OTP_sid = sid
  }
  //# get value OTP Sid after singup success
  getTmpOTPSid(){
    return this.tmp_OTP_sid
  }

  //# verified account phone otp
  verifyPhoneOTP(sid:string, pin_code:string){
    let tmp_data={
      "OTP_sid":sid,
      "pin_code":pin_code
    }
    const url = this.baseAPI + '/api/member/verify-phone-otp/';
    return this.http.post(url,tmp_data);
  }

  //# verified account phone otp
  verifyEmailOTP(sid:string, pin_code:string){
      let tmp_data = {
        "OTP_sid":sid,
        "pin_code":pin_code
      }
      const url = this.baseAPI + '/api/member/verify-email-otp/';
      return this.http.post(url,tmp_data);
  }

  //# resend otp
  resendOTP(data:any){
    const url = this.baseAPI + '/api/member/resend-otp/';
    return this.http.post(url,data);
  }


  //# logout
  logout() {
    localStorage.removeItem('profile')
    this.cookieService.delete('token')
    window.location.replace('/'); 
  }
  
  //# check authentication
  isAuthenticated(): boolean {
    // here you can check if user is authenticated or not through his token
    // if (!this.getToken()) {
    //   return false;
    // } else {
    //   return true;
    // } 
    if (localStorage.getItem("profile") !== null) {
      return true;
    }else{
      return false;
    }
  }

  //# get token
  getToken() {
    if (this.cookieService.check('token')) {
    //  this.token = this.cookieService.get('token');
     this.token = this.allFunction.decryptFileForLocal(this.allFunction.environment.localEncriptKey,
       this.cookieService.get('token'))
    } else {
      this.token = null;
    }
    return this.token;
  }

}