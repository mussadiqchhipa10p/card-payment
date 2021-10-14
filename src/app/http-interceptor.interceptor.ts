import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/auth/authentication.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor(private auth: AuthenticationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.auth.isLogin()) {
      const idToken = localStorage.getItem('apitoken');

      if (idToken) {
        const cloned = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + idToken),
        });

        return next.handle(cloned);
      } else return next.handle(request);
    } else return next.handle(request);
  }
}
