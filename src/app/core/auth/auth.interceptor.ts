import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService} from '../../core/auth/auth.service' 
import { GeneralFunctionService } from '../../core/function/general-function.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
              private cookieService: CookieService,
              private router: Router,
              private allFunction : GeneralFunctionService,
              private auth: AuthService) {}

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq ;
    if (this.cookieService.check('token')) {
      authReq = req.clone({
        headers: req.headers
        .set('Authorization', 'sid ' + 
        this.allFunction.decryptFileForLocal(this.allFunction.environment.localEncriptKey,
          this.cookieService.get('token')))
      });
   } else {
      //# remove profile token expire 
      localStorage.removeItem('profile')
      authReq = req.clone({
        headers: req.headers.set('Authorization','sid '+ environment.base_token)
      });
      // this.router.navigate(['/sign-in']);
   }
   return next.handle(authReq);
}
}