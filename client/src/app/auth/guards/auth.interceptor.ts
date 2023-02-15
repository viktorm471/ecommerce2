import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from 'src/app/services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
// You Must add the interceptor in app.component.ts
  constructor(private userService:UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.userService.currentUser.token){
      request = request.clone({
        setHeaders: {
          access_token: this.userService.currentUser.token,
        }
      })
    }
    return next.handle(request);
  }
}
