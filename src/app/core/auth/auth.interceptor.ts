import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { GeneralFunctionService } from '../../core/function/general-function.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private allFunction: GeneralFunctionService,
    private auth: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    let authReq = req.clone({
      headers: req.headers.set('Authorization', 'sid ' + environment.base_token)
    });

    if (token) {
      // Decrypt the token if necessary
      const decryptedToken = this.allFunction.decryptFileForLocal(environment.localEncriptKey, token);
      authReq = req.clone({
        headers: req.headers.set('Authorization', 'sid ' + decryptedToken)
      });
    } else {
      // If no token is available, proceed with Basic Auth
      const username = environment.Username;  // Replace with actual username
      const password = environment.Password;  // Replace with actual password
      const basicAuthCredentials = btoa(username + ':' + password);  // Encode username and password in base64

      authReq = req.clone({
        headers: req.headers.set('Authorization', 'Basic ' + basicAuthCredentials)
      });
    }

    return next.handle(authReq);
  }
}
